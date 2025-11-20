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
    padding: spacing('s');
    border: 1px solid black;
    border-radius: border-radius('default');
    line-height: 1.3em;

    @include breakpoint('small') {
      padding: spacing('m');
    }

    &.error {
      border-color: color('red');
      background: color('red-light');
    }

    &.success {
      border-color: color('green-dark');
      background: color('green-light');
    }
  }
</style>
