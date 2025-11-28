<script setup lang="ts">
  import { scoreActions } from '~/content/scoreActions';
  import type { ScoreActionId } from '~/types/ScoreActionId';
  import BaseTile from '~/components/BaseTile.vue';

  definePageMeta({
    layout: 'app',
  });

  const { getScoreFromSavegames } = useScore();
  const { getSavegames } = useSavegames();
  const user = useSupabaseUser();

  const { data: score } = useAsyncData('score', async () => {
    const savegames = await getSavegames({ userId: user.value?.sub ?? '' });
    if (!savegames) return;
    return getScoreFromSavegames(savegames.map((savegame) => savegame.data));
  });
</script>

<template>
  <div>
    <BaseTile v-if="score" class="score">
      <div class="score-heading heading-large">
        <div>Score</div>
        <div class="total">{{ formatNumber(sumArray(Object.values(score).map((entry) => entry.total))) }}</div>
      </div>
      <div class="score-items">
        <div v-for="[key, value] in Object.entries(score)" class="item">
          <div class="key">{{ value.amount }} × {{ scoreActions[key as ScoreActionId]?.name }}</div>
          <div class="value">{{ formatNumber(value.total) }}</div>
        </div>
        <template v-if="Object.values(score).length === 0"> Du hast noch keine Aktion abgeschlossen, die deinen Score erhöht. </template>
      </div>
    </BaseTile>
  </div>
</template>

<style lang="scss" scoped>
  .score {
    font-variant-numeric: tabular-nums;

    @include breakpoint('medium') {
      font-size: 20px;
    }
  }

  .score-heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: spacing('l');
  }

  .total {
    @include var-font-weight(700);
  }

  .score-items {
    display: flex;
    flex-direction: column;
    gap: spacing('xxs');
  }

  .key {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .value {
    min-width: 80px;
    text-align: right;
  }

  .item {
    display: flex;
    justify-content: space-between;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: spacing('m');
    margin-top: spacing('l');
  }
</style>
