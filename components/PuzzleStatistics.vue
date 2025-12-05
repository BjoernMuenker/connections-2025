<script setup lang="ts">
  import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
  import type { StatisticsScope } from '~/types/StatisticsScope';
  import StackedBarChart from './StackedBarChart.vue';
  import StatisticItem from './StatisticItem.vue';
  import UserGuesses from './UserGuesses.vue';
  import UserProgress from './UserProgress.vue';
  import UserScoreBreakdown from './UserScoreBreakdown.vue';
  import UserGuess from './UserGuess.vue';

  const props = defineProps<{ states: PuzzlePersistedState[]; scope: StatisticsScope }>();

  const { getScoreFromSavegames } = useScore();
  const { getGuessesOccurrences, getSolveOrder } = useStats();

  const puzzleId = computed(() => props.states[0].id);
  const score = computed(() => getScoreFromSavegames(props.states));
  const totalScore = computed(() => sumArray(Object.values(score.value).map((entry) => entry.total)));

  const solvedFirst = computed(() => {
    if (props.scope === 'player') return;
    return getSolveOrder(props.states, 'first');
  });

  const solvedLast = computed(() => {
    if (props.scope === 'player') return;
    return getSolveOrder(props.states, 'last');
  });

  const completedGames = computed(() => props.states.filter((states) => states.solved.length === 4).length);
  const totalMistakes = computed(() => sumArray(props.states.map((state) => 4 - state.remainingMistakes)));
  const totalTurns = computed(() => sumArray(props.states.filter((states) => states.solved.length === 4).map((state) => state.guesses.length)));
  const guessesOccurences = computed(() => getGuessesOccurrences(props.states));

  const mostCommonGuess = computed(() => guessesOccurences.value[0]);
  const mostCommonMistakeGuess = computed(
    () =>
      guessesOccurences.value.filter((entry) => {
        const firstLetters = entry.value.map((v) => v[0]);
        const unique = new Set(firstLetters);
        return unique.size > 1;
      })[0]
  );
  const leastCommonGuess = computed(() => guessesOccurences.value[guessesOccurences.value.length - 1]);

  const items = computed(() => {
    if (props.scope === 'player') return [];

    const averageMistakesPerUser = totalMistakes.value / props.states.length;
    const averageTurnsPerUser = totalTurns.value / completedGames.value;

    return [
      {
        key: 'averageScorePerUser',
        caption: '⌀ Score / Person',
        value: totalScore.value / props.states.length,
      },
      {
        key: 'totalMistakes',
        caption: 'Fehler insgesamt',
        value: totalMistakes.value,
      },
      {
        key: 'averageMistakesPerUser',
        caption: '⌀ Fehler / Person',
        value: averageMistakesPerUser,
      },
      {
        key: 'totalTurns',
        caption: 'Spielzüge ingesamt',
        value: totalTurns.value,
      },
      {
        key: 'averageTurnsPerUser',
        caption: '⌀ Spielzüge / Person',
        value: averageTurnsPerUser,
      },
    ];
  });
</script>

<template>
  <div class="puzzle-statistics">
    <div class="items">
      <div v-if="states.length === 0">Noch keine Daten</div>
      <template v-else>
        <StatisticItem v-if="scope === 'global'" caption="Siege vs. Niederlagen" class="bar-chart">
          <UserProgress :states="states" :scope="scope" />
        </StatisticItem>
        <StatisticItem v-if="solvedFirst" caption="Zuerst gelöst" class="bar-chart">
          <StackedBarChart :data="solvedFirst" />
        </StatisticItem>
        <StatisticItem v-if="solvedLast" caption="Zuletzt gelöst" class="bar-chart">
          <StackedBarChart :data="solvedLast" />
        </StatisticItem>
        <UserScoreBreakdown :states="states" :scope="scope" />
        <StatisticItem v-if="scope === 'player'" caption="Fehler" :value="totalMistakes" />
        <UserGuesses v-if="scope === 'player'" :guesses="states.map((state) => state.guesses).flat()" :puzzle-id="puzzleId" />
        <StatisticItem v-for="item in items" :key="item.key" :caption="item.caption" :value="item.value" />
        <template v-if="scope === 'global'">
          <StatisticItem caption="Häufigster Spielzug">
            <template v-if="mostCommonGuess">
              <UserGuess :guess="mostCommonGuess?.value" :puzzle-id="puzzleId" />
              {{ mostCommonGuess?.count }} Mal gespielt
            </template>
          </StatisticItem>
          <StatisticItem caption="Häufigster falscher Spielzug">
            <template v-if="mostCommonMistakeGuess">
              <UserGuess :guess="mostCommonMistakeGuess?.value" :puzzle-id="puzzleId" />
              {{ mostCommonMistakeGuess?.count }} Mal gespielt
            </template>
            <template v-else>noch keine Daten</template>
          </StatisticItem>
          <StatisticItem caption="Seltenster Spielzug">
            <template v-if="leastCommonGuess">
              <UserGuess :guess="leastCommonGuess?.value" :puzzle-id="puzzleId" />
              {{ leastCommonGuess?.count }} Mal gespielt
            </template>
          </StatisticItem>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .base-tile .heading-large {
    margin-bottom: spacing('l');
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: spacing('m');
  }

  .user-guess {
    margin-bottom: spacing('s');
  }
</style>
