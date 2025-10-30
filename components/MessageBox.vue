<script setup lang="ts">
  const props = defineProps<{ type: 'error' | 'success' | 'warning' }>();
</script>

<template>
  <div class="message-box" :class="type">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .message-box {
    padding: spacing('m');
    border: 1px solid black;
    border-radius: 8px;

    &.error {
      background: rgb(255, 200, 200);
      border-color: rgb(210, 0, 0);
    }
  }
</style>
