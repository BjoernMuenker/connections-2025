<script setup lang="ts">
  import StatisticItem from './StatisticItem.vue';

  const props = defineProps<{ score: number }>();
</script>

<template>
  <div class="user-score">
    <StatisticItem caption="Score" :value="score" />
  </div>
</template>
