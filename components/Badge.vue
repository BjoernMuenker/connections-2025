<script setup lang="ts">
  const props = defineProps<{ color: 'green-200' }>();
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

    &.green-200 {
      color: color('green-200');
      background: color('green-100');
    }
  }
</style>
