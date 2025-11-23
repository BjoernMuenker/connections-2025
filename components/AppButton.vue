<script setup lang="ts">
  const props = withDefaults(defineProps<{ tag?: 'a' | 'button'; loading?: boolean; disabled?: boolean; hierarchy?: 'primary' | 'secondary' }>(), {
    tag: 'button',
    hierarchy: 'primary',
  });
</script>

<template>
  <component :is="tag" :disabled="loading || disabled" :class="hierarchy">
    <span v-if="loading">lädt...</span>
    <slot v-else />
  </component>
</template>

<style lang="scss" scoped>
  button,
  a {
    font-size: 18px;
    padding: spacing('xs') spacing('s');
    border-radius: border-radius('default');
    transition: transform 0.2s;
    border-width: 2px;
    border-style: solid;
    @include var-font-weight(500);

    @include breakpoint('medium') {
      font-size: 20px;
      padding: spacing('s') spacing('s');
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

      &:disabled {
        border-color: #cdcdcd;
        color: #cdcdcd;
      }
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  a {
    display: inline-block;
  }
</style>
