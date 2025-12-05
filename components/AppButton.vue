<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      tag?: 'a' | 'button';
      loading?: boolean;
      disabled?: boolean;
      hierarchy?: 'primary' | 'secondary';
      color?: 'grey-600' | 'red-300';
      size?: 'default' | 'small';
    }>(),
    {
      tag: 'button',
      hierarchy: 'primary',
      color: 'grey-600',
      size: 'default',
    }
  );
</script>

<template>
  <component :is="tag" :disabled="loading || disabled" :class="[hierarchy, color, size, { disabled: disabled }]">
    <span v-if="loading">lädt...</span>
    <slot v-else />
  </component>
</template>

<style lang="scss" scoped>
  button,
  a {
    font-size: 18px;
    padding: spacing('s');
    border-radius: border-radius('default');
    border-width: 2px;
    border-style: solid;
    text-align: center;
    white-space: nowrap;
    transition: color 0.3s, transform 0.3s, background-color 0.3s, border 0.3s;
    @include var-font-weight(500);

    @include breakpoint('medium') {
      font-size: 20px;
    }

    &:active:not(:disabled):not(.disabled) {
      transform: scale(0.95);
    }

    &.primary {
      color: color('white');

      &.grey-600 {
        background: color('grey-600');
        border-color: color('grey-600');
      }

      &.red-300 {
        background: color('red-300');
        border-color: color('red-300');
      }

      &:disabled,
      &.disabled {
        background-color: color('grey-200');
        border-color: color('grey-200');
      }
    }

    &.secondary {
      &.grey-600 {
        color: color('grey-600');
        border-color: color('grey-600');
      }

      &.red-300 {
        color: color('red-300');
        border-color: color('red-300');
      }

      &:disabled,
      &.disabled {
        border-color: color('grey-200');
        color: color('grey-200');
      }
    }

    &:disabled,
    &.disabled {
      cursor: not-allowed;
    }

    &.small {
      padding: spacing('xs') spacing('s');
      font-size: 15px;

      @include breakpoint('medium') {
        font-size: 17px;
      }
    }
  }

  a {
    display: inline-block;

    &.disabled {
      pointer-events: none;
    }
  }
</style>
