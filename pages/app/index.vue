<script setup lang="ts">
  import { puzzles } from '~/content/puzzles';

  const user = useSupabaseUser();
  const { $gsap } = useNuxtApp();
  const { getServerTime, isEqualOrLaterThan } = useServerTime();
  const router = useRouter();

  definePageMeta({
    layout: 'app',
  });

  const { data: serverTime } = useAsyncData('serverTime', () => getServerTime());

  onMounted(() => {
    // use KeenSlider instead, does not feel great on mobile
    // $gsap.Draggable.create('.puzzles', { lockAxis: true, type: 'x', inertia: true, bounds: { minX: -24 * 200, maxX: 0 } });
  });
</script>

<template>
  <div class="wrapper">
    serverTime: {{ serverTime }}
    <div v-if="serverTime">
      <ClientOnly>{{ new Date(serverTime) }}</ClientOnly>
    </div>
    <div class="puzzles">
      <button
        v-for="puzzle in puzzles"
        class="puzzle"
        @click="router.push(`/app/${puzzle.id}`)"
        :disabled="!serverTime || serverTime < puzzle.unlocksAt"
      >
        {{ puzzle.id }}
        <div class="debug">unlocksAt: {{ new Date(puzzle.unlocksAt) }}</div>
      </button>
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

  .debug {
    font-size: 14px;
  }
</style>
