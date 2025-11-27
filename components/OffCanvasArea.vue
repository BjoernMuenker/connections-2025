<script setup lang="ts">
  import { useAppStore } from '~/store/appStore';
  import OffCanvas from './OffCanvas.vue';

  const store = useAppStore();
  const offCanvasRef = ref();

  const showBackdrop = ref(false);

  function onBackdropClick() {
    if (!store.offCanvas?.clickOutside) return;
    store.closeOffCanvas();
  }
</script>

<template>
  <div class="off-canvas-area">
    <div class="off-canvas-backdrop" :class="{ visible: showBackdrop }" @click="onBackdropClick"></div>
    <OffCanvas ref="offCanvasRef" v-bind="store.offCanvas" @on-open="showBackdrop = true" @on-close="showBackdrop = false" />
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
    z-index: 1;

    &.visible {
      opacity: 1;
      pointer-events: all;
    }
  }
</style>
