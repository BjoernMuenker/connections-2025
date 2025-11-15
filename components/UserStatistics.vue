<script setup lang="ts">
  import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
  import UserScore from './UserScore.vue';
  import UserProgress from './UserProgress.vue';
  import StatisticItem from './StatisticItem.vue';
  import UserRank from './UserRank.vue';
  import StackedBarChart from './StackedBarChart.vue';
  import type { PuzzleGroupId } from '~/types/PuzzleGroupId';

  const props = defineProps<{ states: PuzzlePersistedState[]; score: { score: number; rank: number; totalRanks: number; badge?: string } }>();

  const { isGroupSolvedByUser, getColorByGroupId, getNameByGroupId, getGroupsSolvedByUser } = usePuzzle();

  const solvedFirst = computed(() => {
    return getSolveOrder(props.states, 'first');
  });

  const solvedLast = computed(() => {
    return getSolveOrder(props.states, 'last');
  });

  function getSolveOrder(states: PuzzlePersistedState[], position: 'first' | 'last') {
    const counts: { [key in PuzzleGroupId]: number } = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    };

    for (const state of props.states) {
      const solvedGroups = getGroupsSolvedByUser(state);
      if (solvedGroups.length === 0) continue;
      const index = position === 'first' ? 0 : solvedGroups.length - 1;
      counts[solvedGroups[index]]++;
    }

    return Object.entries(counts).map(([key, value]) => {
      return {
        id: key,
        caption: getNameByGroupId(key as PuzzleGroupId),
        color: getColorByGroupId(key as PuzzleGroupId),
        amount: value,
      };
    });
  }

  const items = computed(() => {
    const totalMistakes = sumArray(props.states.map((state) => 4 - state.remainingMistakes));
    const averageMistakesPerDay = totalMistakes / (24 * props.states.length);
    const daysWithoutMistake = props.states.filter((state) => state.won && state.remainingMistakes === 4).length;

    return [
      {
        key: 'totalMistakes',
        caption: 'Fehler insgesamt',
        value: totalMistakes,
      },
      {
        key: 'averageMistakesPerDay',
        caption: '⌀ Fehler / Tag',
        value: averageMistakesPerDay,
      },
      {
        key: 'daysWithoutMistake',
        caption: 'Fehlerfreie Tage',
        value: daysWithoutMistake,
      },
    ];
  });
</script>

<template>
  <div class="user-statistics">
    <UserProgress :states="states" />
    <div class="items">
      <UserScore v-bind="score" />
      <UserRank :rank="score.rank" :totalRanks="score.totalRanks" />
      <StatisticItem caption="Zuerst gelöst" class="bar-chart">
        <StackedBarChart :data="solvedFirst" />
      </StatisticItem>
      <StatisticItem caption="Zuletzt gelöst" class="bar-chart">
        <StackedBarChart :data="solvedLast" />
      </StatisticItem>
      <StatisticItem v-for="item in items" :key="item.key" :caption="item.caption" :value="item.value" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .items {
    display: flex;
    flex-wrap: wrap;
    gap: spacing('s');
    margin-top: spacing('xl');

    > div {
      flex: 1;
      min-width: 200px;

      &.bar-chart {
        min-width: 100%;
      }
    }
  }
</style>
