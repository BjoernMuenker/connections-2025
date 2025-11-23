<script setup lang="ts">
  import { onMounted, watch } from 'vue';
  import { gsap } from 'gsap';

  const props = defineProps<{ remainingMistakes: number }>();

  watch(
    () => props.remainingMistakes,
    (newValue, oldValue) => {
      if (newValue === oldValue) return;

      const amount = Math.abs(oldValue - newValue);
      const selector = oldValue < newValue ? '.mistake-bubble.used' : '.mistake-bubble:not(.used)';
      const elements = gsap.utils.toArray(document.querySelectorAll(selector)) as HTMLElement[];

      if (oldValue > newValue) {
        const _elements = elements.reverse().slice(0, amount);
        gsap.set(_elements, { background: '#82837a' });
        gsap.to(_elements, { scale: 0, duration: 0.3, stagger: 0.1 });
      } else {
        const _elements = elements.slice(0, amount);
        gsap.set(_elements, { clearProps: 'background' });
        gsap.to(elements.slice(0, amount), { scale: 1, duration: 0.3, ease: 'back(2)', stagger: 0.1 });
      }
    }
  );

  onMounted(() => {
    const selector = document.querySelectorAll('.mistake-bubble.used');
    if (selector.length === 0) return;
    gsap.set(selector, { scale: 0 });
  });
</script>

<template>
  <div class="puzzle-mistakes">
    <div class="mistakes-caption">Verbleibende Fehler:</div>
    <div class="mistakes-bubbles">
      <div v-for="index in 4" :key="index" class="bubble-wrapper">
        <div class="background"></div>
        <div class="mistake-bubble" :class="{ used: index > remainingMistakes }"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .puzzle-mistakes {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: spacing('m');
    gap: spacing('xs');

    .mistakes-caption {
      font-size: 16px;
    }

    .mistakes-bubbles {
      display: flex;
      gap: spacing('xs');
    }

    .mistake-bubble,
    .background {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: color('grey');
    }

    .mistake-bubble {
      position: relative;
      z-index: 1;
    }

    .bubble-wrapper {
      position: relative;
      width: 16px;
      height: 16px;
    }

    .background {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: color('grey-very-light');
    }
  }
</style>
