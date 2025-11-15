<script setup lang="ts">
  import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
  import StackedBarChart from './StackedBarChart.vue';

  const props = defineProps<{ states: PuzzlePersistedState[] }>();

  const stats = computed(() => {
    const won = props.states.filter((state) => state.won).length;
    const lost = props.states.filter((state) => state.solved.length === 4 && !state.won).length;
    const pending = props.states.length * 24 - (won + lost);
    const totalDays = won + lost + pending;
    const wonPercentage = (won / totalDays) * 100;
    const lostPercentage = (lost / totalDays) * 100;
    const pendingPercentage = (pending / totalDays) * 100;

    return {
      lost,
      lostPercentage,
      pending,
      pendingPercentage,
      won,
      wonPercentage,
    };
  });

  const data = computed(() => {
    const won = props.states.filter((state) => state.won).length;
    const lost = props.states.filter((state) => state.solved.length === 4 && !state.won).length;
    const pending = props.states.length * 24 - (won + lost);

    return [
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
      {
        id: 'pending',
        caption: 'ausstehend',
        amount: pending,
        color: 'white',
      },
    ];
  });
</script>

<template>
  <div class="user-progress">
    <StackedBarChart :data="data" />
    <!-- <div class="bar-chart">
      <div v-if="stats.won > 0" class="won" :style="{ width: stats.wonPercentage + '%' }"></div>
      <div v-if="stats.lost > 0" class="lost" :style="{ width: stats.lostPercentage + '%' }"></div>
      <div v-if="stats.pending > 0" class="pending" :style="{ width: stats.pendingPercentage + '%' }"></div>
    </div> -->
    <!-- <div class="counts">{{ stats.won }}&nbsp;gewonnen, {{ stats.lost }}&nbsp;verloren, {{ stats.pending }}&nbsp;ausstehend</div> -->
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
