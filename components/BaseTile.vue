<script setup lang="ts">
  const props = withDefaults(defineProps<{ padding?: 'default' | 'small' }>(), { padding: 'default' });
</script>

<template>
  <div class="base-tile" :class="`padding-${padding}`">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .base-tile {
    padding: spacing('l');
    background: color('white');
    border-radius: border-radius('large');

    &.padding-small {
      padding: spacing('m');
    }

    @include breakpoint('small') {
      padding: spacing('xl');

      &.padding-small {
        padding: spacing('l');
      }
    }
  }
</style>
