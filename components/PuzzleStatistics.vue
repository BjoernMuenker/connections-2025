<script setup lang="ts">
  import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
  import { scoreActions } from '~/content/scoreActions';

  import type { ScoreActionId } from '~/types/ScoreActionId';
  import BaseTile from './BaseTile.vue';

  const props = defineProps<{ state: PuzzlePersistedState }>();

  const { getColorByGroupItemId, initPuzzleById } = usePuzzle();
  const { getScoreFromSavegame } = useScore();

  const message = computed(() => {
    const mistakes = props.state.won ? props.state.guesses.length - 4 : 4;

    const mistakesToMessage: { [key: number]: string } = {
      0: 'Unglaublich!',
      1: 'Sehr gut!',
      2: 'Nicht schlecht!',
      3: 'Knappe Kiste!',
      4: 'Nächstes Mal!',
    };

    return mistakesToMessage[mistakes] ? mistakesToMessage[mistakes] : mistakesToMessage[4];
  });

  const score = computed(() => {
    return getScoreFromSavegame(props.state);
  });

  const puzzle = initPuzzleById(props.state.id);
</script>

<template>
  <div class="puzzle-statistics">
    <h1 class="heading-xlarge">{{ message }}</h1>
    <div class="items">
      <BaseTile class="score">
        <div class="score-heading heading-large">
          <div>Score</div>
          <div class="total">{{ formatNumber(sumArray(Object.values(score).map((entry) => entry.total))) }}</div>
        </div>
        <div class="score-items">
          <div v-for="[key, value] in Object.entries(score)" class="item">
            <div>{{ value.amount }} × {{ scoreActions[key as ScoreActionId]?.name }}</div>
            <div>{{ formatNumber(value.total) }}</div>
          </div>
          <template v-if="Object.values(score).length === 0">
            Du hast diesmal leider keine Aktionen abgeschlossen, die deinen Score erhöhen.
          </template>
        </div>
      </BaseTile>
      <BaseTile>
        <div class="heading-large">Spielzüge</div>
        <div class="guesses">
          <div v-for="(guess, index) in state.guesses" :key="index" class="guess">
            <div class="index">{{ index + 1 }}</div>
            <div v-for="tile in guess" :key="tile" class="tile" :class="`background-${getColorByGroupItemId(tile)}`">
              <!-- {{ puzzle?.items.find((item) => item.id === tile)?.caption }} -->
            </div>
          </div>
        </div>
      </BaseTile>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .base-tile .heading-large {
    margin-bottom: spacing('l');
  }

  .score-heading {
    display: flex;
    justify-content: space-between;
  }

  .total {
    @include var-font-weight(700);
  }

  .guesses {
    display: flex;
    flex-direction: column;
    gap: spacing('xs');
    font-variant-numeric: tabular-nums;

    @include breakpoint('small') {
      gap: spacing('s');
    }
  }

  .guess {
    display: flex;
    gap: spacing('xs');
    align-items: center;
  }

  .index {
    text-align: right;
    margin-right: spacing('s');
  }

  .tile {
    flex: 1;
    height: 12px;
    border-radius: border-radius('default');
  }

  .score-items {
    display: flex;
    flex-direction: column;
    gap: spacing('xxs');
  }

  .score .item {
    display: flex;
    justify-content: space-between;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: spacing('m');
    margin-top: spacing('l');
  }

  .score {
    font-variant-numeric: tabular-nums;
  }
</style>
