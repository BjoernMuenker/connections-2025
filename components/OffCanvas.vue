<script setup lang="ts">
  import { useAppStore } from '~/store/appStore';
  import UserMenu from './UserMenu.vue';

  const { $gsap } = useNuxtApp();
  const store = useAppStore();

  function open() {
    $gsap.to('.off-canvas', { translateY: 0, duration: 0.3 });
    $gsap.to('.non-off-canvas', { scale: 0.9, duration: 0.3 });
  }

  function close() {
    $gsap.to('.off-canvas', { translateY: '100%', duration: 0.3 });
    $gsap.to('.non-off-canvas', { scale: 1, duration: 0.3 });
  }

  watch(
    () => store.offCanvasVisible,
    () => {
      if (store.offCanvasVisible) {
        open();
        return;
      }
      close();
    }
  );
</script>

<template>
  <div class="off-canvas">
    <div class="off-canvas-inner">
      <button class="close-button" @click="store.closeOffCanvas">×</button>
      <div class="scroll-area">
        <UserMenu />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .off-canvas {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    max-height: 80%;
    background: color('white');
    border-top-left-radius: border-radius('large');
    border-top-right-radius: border-radius('large');
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
  }

  .off-canvas-inner {
    // position: relative;
    display: flex;
    flex-direction: column;
    padding: spacing('l') spacing('m');
    width: 100%;
    height: 100%;
    overflow: auto;

    @include breakpoint('large') {
      width: 616px;
      margin: 0 auto;
    }
  }

  .close-button {
    position: absolute;
    right: spacing('m');
    top: spacing('m');
    width: 40px;
    height: 40px;
    background: color('beige');
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    @include breakpoint('medium') {
      width: 48px;
      height: 48px;
    }
  }
</style>
