<script setup lang="ts">
  const props = defineProps<{ color: 'green' }>();
</script>

<template>
  <div class="badge" :class="color">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .badge {
    font-size: 14px;
    line-height: 1em;
    padding: spacing('xxs');
    border-radius: 4px;

    &.green {
      color: color('green-dark');
      background: color('green-light');
    }
  }
</style>
