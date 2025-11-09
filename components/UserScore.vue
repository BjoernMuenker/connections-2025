<script setup lang="ts">
  import AppButton from './AppButton.vue';
  import Badge from './Badge.vue';

  const props = defineProps<{ score: number; rank: number; totalRanks: number; badge?: string }>();
</script>

<template>
  <div class="user-score">
    <div class="heading-wrapper">
      <div class="heading-medium">Score</div>
      <div class="rank">
        <div class="rank">Platz {{ rank }}/{{ totalRanks }}</div>
        <Badge v-if="badge" color="green">{{ badge }}</Badge>
      </div>
    </div>
    <div class="score heading-xlarge">{{ formatNumber(score) }}</div>
    <!-- <AppButton hierarchy="secondary">Bestenliste</AppButton> -->
  </div>
</template>

<style lang="scss" scoped>
  .user-score {
    min-width: 300px;
    border: 1px solid #cdcdcd;
    border-radius: 8px;
    padding: spacing('l');
    display: inline-block;
    background: linear-gradient(#fff, #eeeeee);
  }

  .heading-wrapper {
    display: flex;
    justify-content: space-between;
  }

  button {
    margin-top: spacing('m');
    width: 100%;
  }

  .score {
    @include var-font-weight(700);
  }

  .rank {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: spacing('xxs');
  }
</style>
