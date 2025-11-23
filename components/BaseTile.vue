<script setup lang="ts"></script>

<template>
  <div class="base-tile">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .base-tile {
    padding: spacing('l');
    background: color('white');
    border-radius: border-radius('large');

    @include breakpoint('small') {
      padding: spacing('xl');
    }
  }
</style>
