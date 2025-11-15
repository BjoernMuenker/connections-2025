<script setup lang="ts">
  import { usePuzzle } from '#imports';
  import KeenSlider, { type KeenSliderInstance } from 'keen-slider';
  import AppButton from '~/components/AppButton.vue';
  import UserProgress from '~/components/UserProgress.vue';
  import UserScore from '~/components/UserScore.vue';
  import { puzzles as puzzlesData } from '~/content/puzzles';
  import { useAppStore } from '~/store/appStore';

  const store = useAppStore();
  const user = useSupabaseUser();
  const { $gsap } = useNuxtApp();
  const { getServerTime } = useServerTime();
  const { getPlayerStats } = useStats();
  const { getSavegames } = useSavegames();
  const { getColorByGroupId } = usePuzzle();
  const router = useRouter();
  const { routes } = useRoutes();

  definePageMeta({
    layout: 'app',
  });

  const { data: serverTime } = useAsyncData('serverTime', () => getServerTime());
  const { data: scores } = useAsyncData('profiles', () => getPlayerStats(user.value?.sub ?? ''));
  const { data: savegames } = useAsyncData('savegames', () => getSavegames({ userId: user.value?.sub ?? '' }));

  const sliderRef = ref<HTMLElement | null>(null);
  const slider = ref<KeenSliderInstance | null>(null);

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
      };
    });
  });

  onMounted(() => {
    if (!sliderRef.value) return;
    slider.value = new KeenSlider(sliderRef.value, {
      selector: '.slide',
      mode: 'free-snap',
      slides: {
        origin: 'center',
        perView: 'auto',
        spacing: 16,
      },
      breakpoints: {
        '(min-width: 480px)': {
          slides: { origin: 'auto', perView: 'auto', spacing: 16 },
        },
      },
    });
  });
</script>

<template>
  <div class="wrapper">
    <!-- {{ savegames }} -->
    <div class="puzzles" ref="sliderRef">
      <div class="slide" v-for="puzzle in puzzles" :key="puzzle.id">
        <button
          class="puzzle"
          @click="router.push(`/app/${puzzle.id}`)"
          :disabled="!serverTime || serverTime < puzzle.unlocksAt"
          :class="{ today: currentDay?.toString() === puzzle.id, won: puzzle.won, lost: puzzle.lost }"
        >
          <div class="id">{{ puzzle.id }}</div>
          <div class="solved">
            <div
              v-for="index in 4"
              :key="index"
              class="group"
              :class="[puzzle.solved[index - 1] ? `background-${getColorByGroupId(puzzle.solved[index - 1])}` : '']"
            ></div>
          </div>
        </button>
      </div>
    </div>
    <div class="stats">
      <div class="heading">
        <div class="heading-large">Dein Fortschritt</div>
        <NuxtLink :to="routes.statistics">Mehr</NuxtLink>
      </div>
      <UserProgress v-if="savegames" :states="savegames.map((savegame) => savegame.data)" />
      <UserScore v-if="scores" v-bind="scores" @click="router.push(routes.scores)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .puzzles {
    display: flex;
  }

  .puzzle {
    display: block;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    background: color('white');
    // border: 2px solid #333;

    border-radius: spacing('s');
    padding: spacing('l');
    font-size: 50px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    &.today {
      box-shadow: 0 0 0 3px inset;
    }

    &:disabled {
      opacity: 0.3;
      pointer-events: none;
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
      background: color('red');
    }

    &.won::after {
      background: color('green');
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
      background: #efefef;
    }
  }

  .stats {
    margin-top: spacing('xl');

    .heading {
      display: flex;
      justify-content: space-between;
    }

    .heading-large {
      margin-bottom: spacing('m');
    }
  }

  .debug {
    font-size: 14px;
  }

  .user-progress {
    margin-bottom: spacing('l');
  }

  .user-score {
    @include breakpoint('small', 'max') {
      width: 100%;
    }
  }
</style>
