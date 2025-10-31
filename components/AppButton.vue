<script setup lang="ts">
  const props = defineProps<{ loading?: boolean; disabled?: boolean }>();
</script>

<template>
  <button :disabled="loading || disabled">
    <span v-if="loading">lädt...</span>
    <slot v-else />
  </button>
</template>

<style lang="scss" scoped>
  button {
    font-size: 20px;
    padding: 14px 20px;
    background: #333;
    color: #fff;
    font-weight: bold;
    border-radius: 8px;
    transition: transform 0.2s;

    &:disabled {
      cursor: not-allowed;
      background: #cdcdcd;
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }
  }
</style>
