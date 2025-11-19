<script setup lang="ts">
  const props = defineProps<{ caption?: string; value?: string | number }>();
</script>

<template>
  <div class="statistic-item">
    <div class="key heading-medium">
      <template v-if="caption">{{ caption }}</template>
      <slot name="caption"></slot>
    </div>
    <div class="value">
      <template v-if="value !== undefined">
        <div class="heading-large">{{ typeof value === 'number' ? formatNumber(value) : value }}</div>
      </template>
      <slot v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .statistic-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: spacing('m');
    background: color('white');
    border-radius: spacing('m');

    @include breakpoint('small') {
      padding: spacing('l');
    }
  }

  .key {
    margin-bottom: spacing('l');
    @include var-font-weight(500);
  }
</style>
