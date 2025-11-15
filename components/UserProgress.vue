<script setup lang="ts">
  import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
  import StackedBarChart from './StackedBarChart.vue';
  import type { StackedBarChartItem } from '~/types/StackedBarChartItem';

  const props = defineProps<{ states: PuzzlePersistedState[]; showPending?: boolean }>();

  const data = computed(() => {
    const won = props.states.filter((state) => state.won).length;
    const lost = props.states.filter((state) => state.solved.length === 4 && !state.won).length;
    const pending = 24 - (won + lost);

    const result: StackedBarChartItem[] = [
      {
        id: 'won',
        caption: 'gewonnen',
        amount: won,
        color: 'green',
      },
      {
        id: 'lost',
        caption: 'verloren',
        amount: lost,
        color: 'red',
      },
    ];

    if (props.showPending) {
      result.push({
        id: 'pending',
        caption: 'ausstehend',
        amount: pending,
        color: 'white',
      });
    }

    return result;
  });
</script>

<template>
  <div class="user-progress">
    <StackedBarChart :data="data" />
  </div>
</template>

<style lang="scss" scoped>
  .bar-chart {
    display: flex;
    gap: spacing('xs');
    width: 100%;
    border-radius: 6px;
    height: 12px;
    overflow: hidden;
    margin-bottom: spacing('xs');
  }

  .won {
    background: color('green');
  }

  .lost {
    background: color('red');
  }

  .pending {
    background: color('white');
  }

  .counts {
    @include breakpoint('small') {
      font-size: 20px;
    }
  }
</style>
