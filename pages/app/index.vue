<script setup lang="ts">
  import { usePuzzle } from '#imports';
  import KeenSlider, { type KeenSliderInstance } from 'keen-slider';
  import AppButton from '~/components/AppButton.vue';
  import LoadingIndicator from '~/components/LoadingIndicator.vue';
  import UserProgress from '~/components/UserProgress.vue';
  import UserRank from '~/components/UserRank.vue';
  import UserScore from '~/components/UserScore.vue';
  import { puzzles as puzzlesData } from '~/content/puzzles';
  import { useAppStore } from '~/store/appStore';

  const store = useAppStore();
  const user = useSupabaseUser();
  const { signOut } = useAuth();
  const { getServerTime } = useServerTime();
  const { getScore } = useStats();
  const { getSavegames } = useSavegames();
  const { getColorByGroupId } = usePuzzle();
  const { showTutorial } = useTutorial();
  const router = useRouter();
  const { routes } = useRoutes();

  definePageMeta({
    layout: 'app',
  });

  const {
    data: fetchedData,
    status,
    refresh,
  } = useAsyncData('app/index', async () => {
    const [serverTime, scores, savegames] = await Promise.all([
      getServerTime(),
      getScore(user.value?.user_metadata.display_name ?? ''),
      getSavegames({ userId: user.value?.sub ?? '', sortBy: 'updated_at' }),
    ]);

    if (savegames && savegames.length > 0) {
      if (!store.lastPlayedPuzzleId) {
        store.lastPlayedPuzzleId = savegames[0].puzzleId;
      }
    }

    return { serverTime, scores, savegames };
  });

  const serverTime = computed(() => fetchedData.value?.serverTime);
  const scores = computed(() => fetchedData.value?.scores);
  const savegames = computed(() => fetchedData.value?.savegames ?? []);

  const showDelay = ref(250);
  const { showLoadingIndicator } = useLoadingIndicator(status, { showDelay });

  const sliderRef = ref<HTMLElement | null>(null);
  const slider = ref<KeenSliderInstance | null>(null);
  const activeSlideIndex = ref(0);

  let toastIndex = 0;

  const lockedToasts = [
    'Noch nicht!',
    'Immer noch nicht.',
    'Auch jetzt nicht.',
    'Nein.',
    'Vergiss es.',
    'Du Tür bleibt zu.',
    'Na, wie oft noch?',
    'Okay reicht jetzt.',
    'Noch mal und du fliegst raus.',
    'Ernsthaft.',
    'Letzte Warnung.',
    'Bye Bye!',
  ];

  const currentDay = computed(() => {
    if (!serverTime.value) return;
    return new Date(serverTime.value).getDate();
  });

  const puzzles = computed(() => {
    return Object.values(puzzlesData).map((puzzle) => {
      const savegame = savegames.value?.find((entry) => entry.puzzleId === puzzle.id);

      return {
        ...puzzle,
        ...{
          solved:
            savegame?.data.solved.filter((groupId) => savegame?.data.guesses.find((guess) => guess.every((itemId) => itemId.startsWith(groupId)))) ??
            [],
        },
        ...(savegame && { won: savegame?.data.won && savegame.data.remainingMistakes !== 0 }),
        lost: savegame?.data.solved.length === 4 && !savegame.data.won,
        locked: !serverTime.value || serverTime.value < puzzle.unlocksAt,
      };
    });
  });

  async function onPuzzleClick(puzzle: { id: string; locked: boolean }) {
    const puzzleIndex = Number(puzzle.id) - 1;

    if (activeSlideIndex.value !== puzzleIndex) {
      slider.value?.moveToIdx(puzzleIndex);
      return;
    }

    if (puzzle.locked) {
      if (toastIndex > lockedToasts.length - 1) {
        store.pushToastNotification(lockedToasts[lockedToasts.length - 1]);
        return;
      }

      store.pushToastNotification(lockedToasts[toastIndex]);

      if (toastIndex === lockedToasts.length - 1) {
        toastIndex++;
        await sleep(2000);
        signOut();
        return;
      }

      toastIndex++;
      return;
    }

    router.push(`/app/${puzzle.id}`);
  }

  async function initSlider() {
    await nextTick();

    if (!sliderRef.value) return;

    slider.value = new KeenSlider(sliderRef.value, {
      selector: '.slide',
      mode: 'free-snap',
      initial: Number(store.lastPlayedPuzzleId ?? '1') - 1,
      created(slider) {
        activeSlideIndex.value = slider.track.details.rel;
      },
      slideChanged(slider) {
        activeSlideIndex.value = slider.track.details.rel;
      },
      slides: {
        origin: 'center',
        perView: 'auto',
      },
    });
  }

  function forceRefresh() {
    showDelay.value = 0;
    refresh();
  }

  onMounted(async () => {
    initSlider();
    await showTutorial('firstLogin');
    useDocumentVisibility(() => forceRefresh());
  });
</script>

<template>
  <div class="wrapper">
    <LoadingIndicator v-if="showLoadingIndicator" />
    <Transition name="slide-fade-y" @before-enter="initSlider">
      <div v-if="!showLoadingIndicator">
        <!-- 
        {{ useDebug().getCompletedPuzzleCount() }}
        {{ useDebug().getMissingItemsCount() }}
        {{ useDebug().getDuplicatedItemGroups() }} 
         -->
        <div class="puzzles" ref="sliderRef">
          <div class="slide" v-for="(puzzle, index) in puzzles" :key="puzzle.id" :class="{ active: activeSlideIndex === index }">
            <button
              class="puzzle"
              @click="onPuzzleClick(puzzle)"
              :class="{
                today: currentDay?.toString() === puzzle.id,
                won: puzzle.won,
                lost: puzzle.lost,
                locked: puzzle.locked,
              }"
            >
              <span class="id">{{ puzzle.id }}</span>
              <span class="solved">
                <span
                  v-for="index in 4"
                  :key="index"
                  class="group"
                  :class="[puzzle.solved[index - 1] ? `background-${getColorByGroupId(puzzle.solved[index - 1])}` : '']"
                ></span>
              </span>
            </button>
          </div>
        </div>
        <div class="stats">
          <div class="heading">
            <div class="heading-large">Dein Fortschritt</div>
            <NuxtLink :to="routes.statistics" v-slot="{ href, navigate }" custom>
              <AppButton hierarchy="secondary" size="small" tag="a" :href="href" class="statistics-link" @click="navigate">
                Statistik
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </AppButton>
            </NuxtLink>
          </div>
          <UserProgress v-if="savegames" :states="savegames.map((savegame) => savegame.data)" :show-pending="true" />
          <div class="items">
            <UserScore v-if="scores" v-bind="scores" @click="router.push(routes.score)" />
            <UserRank v-if="scores" v-bind="scores" @click="router.push(routes.leaderboard)" />
          </div>
          <AppButton hierarchy="secondary" size="small" @click="forceRefresh" :disabled="showLoadingIndicator">Aktualisieren</AppButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .loading-indicator {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, calc(-50% + 16px));
  }

  .puzzles {
    display: flex;
    overflow-x: hidden;
    margin-left: -#{spacing('m')};
    margin-right: -#{spacing('m')};
  }

  .slide:not(.active) {
    .puzzle {
      transform: scale(0.84);

      @include breakpoint('small') {
        transform: scale(0.86);
      }
    }
  }

  .puzzle {
    position: relative;
    display: block;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    background: color('white');
    border-radius: spacing('s');
    padding: spacing('l');
    font-size: 50px;
    user-select: none;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    transition: transform 0.3s;

    @include breakpoint('small') {
      width: 260px;
      height: 260px;
    }

    &.locked {
      opacity: 0.3;
    }

    &:active {
      transform: scale(0.9);
    }

    .id {
      text-align: left;
      @include var-font-weight(500);
    }

    &.lost::after,
    &.won::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 20%;
      height: 20%;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
      border-radius: 0 spacing('s') 0 0;
    }

    &.lost::after {
      background: color('red-200');
    }

    &.won::after {
      background: color('green-200');
    }
  }

  .solved {
    display: flex;
    flex-direction: column;
    gap: spacing('xxs');

    .group {
      width: 16px;
      height: 16px;
      border-radius: spacing('xxs');
      background: color('grey-100');
    }
  }

  .stats {
    margin-top: spacing('xl');

    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: spacing('m');
      margin-bottom: spacing('m');
    }

    .statistics-link {
      display: flex;
      align-items: center;
      gap: spacing('xxs');
      padding-right: spacing('xs');
    }
  }

  .debug {
    font-size: 14px;
  }

  .user-progress {
    margin-bottom: spacing('xl');
  }

  .user-score,
  .user-rank {
    cursor: pointer;
  }

  .items {
    display: flex;
    gap: spacing('m');
    margin-bottom: spacing('l');

    > div {
      flex: 1;
    }
  }

  .buttons {
    display: flex;
    gap: spacing('s');
    justify-content: flex-end;
    margin-top: spacing('l');
  }
</style>
