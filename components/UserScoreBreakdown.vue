<script setup lang="ts">
  import { scoreActions } from '~/content/scoreActions';
  import type { ScoreActionId } from '~/types/ScoreActionId';
  import BaseTile from './BaseTile.vue';
  import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
  import type { StatisticsScope } from '~/types/StatisticsScope';

  const { getScoreFromSavegames } = useScore();
  const props = defineProps<{ states: PuzzlePersistedState[]; scope: StatisticsScope }>();

  const scores = computed(() => getScoreFromSavegames(props.states));
  const total = computed(() => sumArray(Object.values(scores.value).map((entry) => entry.total)));
  const actions = computed(() => Object.entries(scores.value));
</script>

<template>
  <BaseTile v-if="scores" class="score">
    <div class="score-heading heading-large">
      <div class="key">Score</div>
      <div class="value heading-large">{{ formatNumber(total) }}</div>
    </div>
    <div v-if="actions && actions.length !== 0" class="score-items">
      <template v-for="[key, value] in actions">
        <div class="amount">{{ value.amount }}&nbsp;×&nbsp;</div>
        <div class="name">{{ scoreActions[key as ScoreActionId]?.name }}</div>
        <div class="subtotal">{{ formatNumber(value.total) }}</div>
      </template>
    </div>
    <div v-else>
      {{
        scope === 'player'
          ? 'Du hast keine Aktion abgeschlossen, die deinen Score erhöht.'
          : 'Es wurden noch keine Aktionen abgeschlossen, die den Score erhöhen.'
      }}
    </div>
  </BaseTile>
</template>

<style lang="scss" scoped>
  .score {
    font-variant-numeric: tabular-nums;
    padding: spacing('m');
    overflow: hidden;

    @include breakpoint('small') {
      padding: spacing('l');
    }

    @include breakpoint('medium') {
      font-size: 20px;
    }
  }

  .score-heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: spacing('l');

    .key {
      @include var-font-weight(500);
    }
  }

  .score-items {
    display: grid;
    grid-template-columns: auto 1fr auto;
    row-gap: spacing('s');
  }

  .amount {
    text-align: right;
  }

  .subtotal {
    text-align: right;
  }

  .name {
    padding-right: spacing('m');
    overflow-wrap: break-word;
  }
</style>
