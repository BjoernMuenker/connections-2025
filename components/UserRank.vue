<script setup lang="ts">
  import StatisticItem from './StatisticItem.vue';

  const props = defineProps<{ rank: number; totalRanks: number }>();
</script>

<template>
  <div class="user-score">
    <StatisticItem caption="Platzierung">
      <span class="heading-large">{{ rank }}</span>
      <span class="total-ranks heading-medium">/{{ totalRanks }}</span>
    </StatisticItem>
  </div>
</template>

<style lang="scss" scoped></style>
