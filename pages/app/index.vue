<script setup lang="ts">
  import { usePuzzle } from '#imports';
  import KeenSlider, { type KeenSliderInstance } from 'keen-slider';
  import UserProgress from '~/components/UserProgress.vue';
  import UserRank from '~/components/UserRank.vue';
  import UserScore from '~/components/UserScore.vue';
  import { puzzles as puzzlesData } from '~/content/puzzles';
  import { useAppStore } from '~/store/appStore';

  const store = useAppStore();
  const user = useSupabaseUser();
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

  const { data: serverTime } = useAsyncData('serverTime', () => getServerTime());
  const { data: scores } = useAsyncData('score', () => getScore(user.value?.user_metadata.display_name ?? ''));
  const { data: savegames } = useAsyncData('savegames', async () => {
    const savegames = await getSavegames({ userId: user.value?.sub ?? '', sortBy: 'updated_at' });
    if (!savegames) return [];

    if (!store.lastPlayedPuzzleId) {
      store.lastPlayedPuzzleId = savegames[0].puzzleId;
    }

    slider.value?.moveToIdx(Number(store.lastPlayedPuzzleId ?? '1') - 1, false, { duration: 0 });
    return savegames;
  });

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
        lost: savegame?.data.solved.length === 4 && !savegame.data.won, // TODO: should this be part of the savegame?
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
        await useSupabaseClient().auth.signOut();
        router.push(routes.signIn);
        return;
      }

      toastIndex++;
      return;
    }

    router.push(`/app/${puzzle.id}`);
  }

  onMounted(() => {
    if (!sliderRef.value) return;

    slider.value = new KeenSlider(sliderRef.value, {
      selector: '.slide',
      mode: 'free-snap',
      initial: Number(store.lastPlayedPuzzleId ?? '1') - 1,
      slideChanged(slider) {
        activeSlideIndex.value = slider.track.details.rel;
      },
      slides: {
        origin: 'center',
        perView: 'auto',
      },
    });

    activeSlideIndex.value = slider.value.track.details.rel;

    showTutorial('firstLogin');
  });
</script>

<template>
  <div class="wrapper">
    <!-- {{ useDebug().getCompletedPuzzleCount() }}
    {{ useDebug().getMissingItemsCount() }}
    {{ useDebug().getDuplicatedItemGroups() }} -->
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
        <NuxtLink :to="routes.statistics" class="statistics-link">
          Statistik
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
      <UserProgress v-if="savegames" :states="savegames.map((savegame) => savegame.data)" :show-pending="true" />
      <div class="items">
        <UserScore v-if="scores" v-bind="scores" @click="router.push(routes.score)" />
        <UserRank v-if="scores" v-bind="scores" @click="router.push(routes.leaderboard)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .puzzles {
    display: flex;
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
      align-items: flex-start;
    }

    .statistics-link {
      display: flex;
      align-items: center;
      gap: spacing('xxs');
      font-size: 18px;
      @include var-font-weight(600);

      @include breakpoint('medium') {
        font-size: 20px;
      }
    }

    .heading-large {
      margin-bottom: spacing('m');
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

    > div {
      flex: 1;
    }
  }
</style>
