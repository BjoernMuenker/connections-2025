<script setup lang="ts">
  const props = withDefaults(
    defineProps<{ tag?: 'a' | 'button'; loading?: boolean; disabled?: boolean; hierarchy?: 'primary' | 'secondary'; color?: 'grey-dark' | 'red' }>(),
    {
      tag: 'button',
      hierarchy: 'primary',
      color: 'grey-dark',
    }
  );
</script>

<template>
  <component :is="tag" :disabled="loading || disabled" :class="[hierarchy, color, { disabled: disabled }]">
    <span v-if="loading">lädt...</span>
    <slot v-else />
  </component>
</template>

<style lang="scss" scoped>
  button,
  a {
    font-size: 18px;
    padding: spacing('s') spacing('s');
    border-radius: border-radius('default');
    transition: transform 0.2s;
    border-width: 2px;
    border-style: solid;
    text-align: center;
    white-space: nowrap;
    transition: background-color 0.3s, border 0.3s;
    @include var-font-weight(500);

    @include breakpoint('medium') {
      font-size: 20px;
    }

    &:active:not(:disabled):not(.disabled) {
      transform: scale(0.95);
    }

    &.primary {
      color: #fff;

      &.grey-dark {
        background: color('grey-dark');
        border-color: color('grey-dark');
      }

      &.red {
        background: color('red');
        border-color: color('red');
      }

      &:disabled,
      &.disabled {
        background-color: color('grey-200');
        border-color: color('grey-200');
      }
    }

    &.secondary {
      &.grey-dark {
        color: color('grey-dark');
        border-color: color('grey-dark');
      }

      &.red {
        color: color('red');
        border-color: color('red');
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
  }

  a {
    display: inline-block;

    &.disabled {
      pointer-events: none;
    }
  }
</style>
