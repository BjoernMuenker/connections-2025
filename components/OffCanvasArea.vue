<script setup lang="ts">
  import { useAppStore } from '~/store/appStore';
  import UserMenu from './UserMenu.vue';
  import OffCanvas from './OffCanvas.vue';

  const store = useAppStore();
  const offCanvasRef = ref();
</script>

<template>
  <div class="off-canvas-area">
    <div class="off-canvas-backdrop" :class="{ visible: store.offCanvasVisible }" @click="store.closeOffCanvas"></div>
    <OffCanvas ref="offCanvasRef" />
  </div>
</template>

<style lang="scss" scoped>
  .off-canvas-backdrop {
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: opacity 0.2s;
    pointer-events: none;

    &.visible {
      opacity: 1;
      pointer-events: all;
    }
  }
</style>
