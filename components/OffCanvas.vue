<script setup lang="ts">
  import { useAppStore } from '~/store/appStore';
  import type { OffCanvasComponent } from '~/types/OffCanvasComponent';

  const { $gsap } = useNuxtApp();
  const props = defineProps<{ component?: OffCanvasComponent; heading?: string }>();
  const store = useAppStore();

  function open() {
    console.log('open');
    $gsap.to('.off-canvas', { translateY: 0, duration: 0.5, ease: 'power4.out' });
    $gsap.to('.non-off-canvas', { scale: 0.9, duration: 0.5, ease: 'power4.out' });
  }

  function close() {
    $gsap.to('.off-canvas', { translateY: '100%', duration: 0.5, ease: 'power4.out' });
    $gsap.to('.non-off-canvas', { scale: 1, duration: 0.5, ease: 'power4.out' });
  }

  function onComponentMounted() {
    open();
  }

  let dynamicComponent: any = null;
  let componentName: OffCanvasComponent;

  function loadComponent() {
    if (!props.component) return;
    componentName = props.component;

    switch (props.component) {
      case 'Tutorial':
        dynamicComponent = defineAsyncComponent(() => import('./TutorialFirstPuzzle.vue'));
        break;

      case 'UserMenu':
        dynamicComponent = defineAsyncComponent(() => import('./UserMenu.vue'));
        break;
    }
  }

  watch(
    () => store.offCanvasVisible,
    async (value: boolean) => {
      if (value) {
        if (props.component !== componentName) {
          loadComponent();
        }

        open();
        return;
      }

      close();
    }
  );
</script>

<template>
  <div class="off-canvas" :class="{ heading }">
    <div v-if="heading" class="off-canvas-header">
      <div class="heading-medium">{{ heading }}</div>
    </div>
    <div class="off-canvas-inner">
      <button class="close-button" @click="store.closeOffCanvas">×</button>
      <div class="scroll-area">
        <template v-if="component">
          <component :is="dynamicComponent" @vue:mounted="onComponentMounted" />
        </template>
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

    &.heading {
      .off-canvas-inner {
        padding: 0 spacing('l') spacing('l') spacing('l');
      }

      .scroll-area {
        @include breakpoint('large') {
          padding-top: spacing('xl');
        }
      }
    }
  }

  .off-canvas-header {
    padding: spacing('l');

    @include breakpoint('large') {
      padding: spacing('xxl') 0 spacing('xl') 0;
      width: 616px;
      margin: 0 auto;
    }
  }

  .off-canvas-inner {
    display: flex;
    flex-direction: column;
    padding: spacing('l');
    width: 100%;
    height: 100%;
    overflow: auto;

    @include breakpoint('large') {
      padding: 0;
    }
  }

  .scroll-area {
    width: 100%;

    @include breakpoint('large') {
      padding: spacing('xxl') 0;
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
    background: color('grey-100');
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    @include breakpoint('medium') {
      width: 48px;
      height: 48px;
    }

    @include breakpoint('large') {
      right: spacing('l');
      top: spacing('l');
    }
  }
</style>
