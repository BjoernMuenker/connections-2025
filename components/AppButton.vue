<script setup lang="ts">
  const props = withDefaults(defineProps<{ loading?: boolean; disabled?: boolean; hierarchy?: 'primary' | 'secondary' }>(), { hierarchy: 'primary' });
</script>

<template>
  <button :disabled="loading || disabled" :class="hierarchy">
    <span v-if="loading">lädt...</span>
    <slot v-else />
  </button>
</template>

<style lang="scss" scoped>
  button {
    font-size: 18px;
    padding: spacing('xs') spacing('s');
    font-weight: bold;
    border-radius: 8px;
    transition: transform 0.2s;
    border-width: 2px;
    border-style: solid;

    @include breakpoint('medium') {
      font-size: 20px;
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    &.primary {
      color: #fff;
      background: #333;
      border-color: #333;

      &:disabled {
        background-color: #c2c2c2;
        border-color: #c2c2c2;
      }
    }

    &.secondary {
      color: #333;
      border-color: #333;
      background: #fff;

      &:disabled {
        border-color: #cdcdcd;
        color: #cdcdcd;
      }
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
</style>
