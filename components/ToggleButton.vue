<script setup lang="ts">
  import { useEventListener } from '@vueuse/core';

  export interface ToggleButtonItem {
    caption: string;
    data: any;
  }

  const props = defineProps<{ modelValue: any; items: ToggleButtonItem[]; disabled?: boolean }>();

  const { $gsap } = useNuxtApp();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: any): void;
  }>();

  const rootRef = ref<HTMLElement | null>(null);
  const btnRefs = ref<HTMLElement[]>([]);

  watch(
    () => props.modelValue,
    () => updateSlider()
  );
  watch(
    () => props.items,
    () => updateSlider()
  );

  function onSelect(item: any) {
    emit('update:modelValue', item.data);
    emit('change', item.data);
  }

  function updateSlider(duration = 0.5) {
    nextTick(() => {
      const index = props.items.findIndex((i) => i.data === props.modelValue);
      const btn = btnRefs.value[index];
      if (!btn) return;

      const { offsetLeft, offsetWidth } = btn;
      const ease = 'power4.out';

      $gsap.to('.highlight', {
        left: offsetLeft + 'px',
        width: offsetWidth + 'px',
        ease,
        duration,
      });

      $gsap.to(btnRefs.value, {
        color: getColor('grey-600'),
        ease,
        duration,
      });

      $gsap.to(btn, {
        color: getColor('white'),
        ease,
        duration,
      });
    });
  }

  onMounted(() => {
    updateSlider(0);
    useEventListener(window, 'resize', () => updateSlider(0));
  });
</script>

<template>
  <div ref="rootRef" class="toggle-button">
    <div class="highlight"></div>
    <button v-for="(item, index) in items" :key="index" :class="{ selected: modelValue === item.data }" @click="onSelect(item)" ref="btnRefs">
      {{ item.caption }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .toggle-button {
    display: inline-flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    background: color('white');
    border-radius: spacing('s');
    padding: spacing('xs');

    .highlight {
      position: absolute;
      top: spacing('xs');
      bottom: spacing('xs');
      background: color('grey-600');
      border-radius: spacing('xs');
      z-index: 0;
    }

    button {
      font-size: 18px;
      position: relative;
      overflow: visible;
      flex-shrink: 0;
      border-radius: spacing('xs');
      padding: spacing('xs') spacing('s');
      @include var-font-weight(500);

      @include breakpoint('medium') {
        font-size: 20px;
      }
    }
  }
</style>
