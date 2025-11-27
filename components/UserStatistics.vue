<script setup lang="ts">
  import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
  import UserScore from './UserScore.vue';
  import UserProgress from './UserProgress.vue';
  import StatisticItem from './StatisticItem.vue';
  import UserRank from './UserRank.vue';
  import StackedBarChart from './StackedBarChart.vue';
  import type { PuzzleGroupId } from '~/types/PuzzleGroupId';
  import { groupNames } from '~/content/groupNames';

  const props = defineProps<{
    states: PuzzlePersistedState[];
    score: { score: number; rank?: number; totalRanks: number; badge?: string };
    scope?: 'player' | 'global';
  }>();

  const { getColorByGroupId, getGroupsSolvedByUser } = usePuzzle();

  const solvedFirst = computed(() => {
    return getSolveOrder(props.states, 'first');
  });

  const solvedLast = computed(() => {
    return getSolveOrder(props.states, 'last');
  });

  const averageScorePerUser = computed(() => {
    return props.score.score / props.score.totalRanks;
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
        caption: groupNames[key as PuzzleGroupId],
        color: getColorByGroupId(key as PuzzleGroupId),
        amount: value,
      };
    });
  }

  const items = computed(() => {
    function getMistakesPerPuzzle(data: PuzzlePersistedState[]) {
      const aggregated = data.reduce<Record<string, number>>((acc, item) => {
        if (item.guesses.length === 0) return acc;
        acc[item.id] = (acc[item.id] ?? 0) + (4 - item.remainingMistakes);
        return acc;
      }, {});

      return aggregated;
    }

    const mistakesPerPuzzle = getMistakesPerPuzzle(props.states);
    const totalMistakes = sumArray(Object.values(mistakesPerPuzzle));
    const averageMistakesPerDay = props.states.length === 0 ? 0 : totalMistakes / props.states.length;
    const daysWithoutMistake = Object.values(mistakesPerPuzzle).filter((value) => value === 0).length;

    const [dayWithMostMistakes, mostMistakesPerDay] = Object.entries(mistakesPerPuzzle).sort((a, b) => b[1] - a[1] || Number(b[0]) - Number(a[0]))[0];

    const [dayWithLeastMistakes, leastMistakesPerDay] = Object.entries(mistakesPerPuzzle).sort(
      (a, b) => a[1] - b[1] || Number(b[0]) - Number(a[0])
    )[0];

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
        key: 'dayWithMostMistake',
        caption: 'Wenigste Fehler',
        value: `${dayWithLeastMistakes}.12. (${leastMistakesPerDay})`,
      },
      {
        key: 'dayWithLeastMistake',
        caption: 'Meiste Fehler',
        value: `${dayWithMostMistakes}.12. (${mostMistakesPerDay})`,
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
    <div class="items">
      <StatisticItem caption="Siege vs. Niederlagen" class="bar-chart">
        <UserProgress :states="states" :scope="scope" />
      </StatisticItem>
      <UserScore v-bind="score" />
      <StatisticItem v-if="scope === 'global'" caption="⌀ Score / Nutzer" :value="averageScorePerUser" />
      <UserRank v-if="scope === 'player' && score.rank" :rank="score.rank" :totalRanks="score.totalRanks" />
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

    > div {
      flex: 1 1;
      flex-shrink: 0;
      min-width: 200px;

      &.bar-chart {
        min-width: 100%;
      }
    }
  }
</style>
