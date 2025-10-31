<script setup lang="ts">
  import { puzzles } from '~/content/puzzles';

  const user = useSupabaseUser();
  const { $gsap } = useNuxtApp();

  definePageMeta({
    layout: 'app',
  });

  onMounted(() => {
    // use KeenSlider instead, does not feel great on mobile
    // $gsap.Draggable.create('.puzzles', { lockAxis: true, type: 'x', inertia: true, bounds: { minX: -24 * 200, maxX: 0 } });
  });
</script>

<template>
  <div class="wrapper">
    <div class="puzzles">
      <NuxtLink v-for="puzzle in puzzles" class="puzzle" :to="`/app/${puzzle.id}`">{{ puzzle.id }}</NuxtLink>
    </div>
    <div class="stats">
      <div class="heading-medium">Dein Fortschritt</div>
    </div>
    <pre>
    {{ user }}
  </pre
    >
  </div>
</template>

<style lang="scss" scoped>
  .wrapper.off-canvas-visible::after {
    content: '';
    position: absolute;
    width: 500%;
    height: 500%;
    left: -50%;
    top: -50%;
    background: rgba(0, 0, 0, 0.8);
  }

  .puzzles {
    display: flex;
    gap: spacing('l');
  }

  .puzzle {
    display: block;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    background: #cdcdcd;
    border-radius: spacing('s');
    padding: spacing('l');
    font-size: 50px;
  }

  .stats {
    margin-top: spacing('xl');
  }
</style>
