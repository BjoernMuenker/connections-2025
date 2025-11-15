<script setup lang="ts">
  import AppButton from './AppButton.vue';
  import Badge from './Badge.vue';
  import StatisticItem from './StatisticItem.vue';

  const props = defineProps<{ score: number; rank: number; totalRanks: number; badge?: string }>();
</script>

<template>
  <div class="user-score">
    <StatisticItem caption="Score" :value="score" />
    <!-- <div class="heading-wrapper">
      <div class="heading-medium">Score</div>
      <div class="rank">
        <div class="rank">Platz {{ rank }}/{{ totalRanks }}</div>
        <Badge v-if="badge" color="green">{{ badge }}</Badge>
      </div>
    </div>
    <div class="score heading-xlarge">{{ formatNumber(score) }}</div> -->
    <!-- <AppButton hierarchy="secondary">Bestenliste</AppButton> -->
  </div>
</template>

<style lang="scss" scoped>
  // .heading-wrapper {
  //   display: flex;
  //   justify-content: space-between;
  // }

  // .score {
  //   @include var-font-weight(700);
  // }

  // .rank {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: flex-end;
  //   gap: spacing('xxs');
  // }
</style>
