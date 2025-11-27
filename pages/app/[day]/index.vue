<script setup lang="ts">
  import Puzzle from '~/components/Puzzle.vue';

  const route = useRoute();
  const puzzleId = computed(() => route.params.day as string);
  const { showTutorial } = useTutorial();

  definePageMeta({
    layout: 'app',
  });

  useHead({
    title: `${puzzleId.value}.Dezember`,
  });
</script>

<template>
  <div>
    <Puzzle :puzzle-id="puzzleId" />
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

  .avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(#454545, #000);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: color('white');
  }

  .puzzles {
    display: flex;
  }

  .stats {
    margin-top: spacing('xl');
  }

  .off-canvas {
    width: 100%;
    left: 0;
    bottom: 0;
    padding: spacing('l');
    position: fixed;
    background: white;
    border: 1px solid #cdcdcd;
    border-bottom: none;
    border-top-left-radius: spacing('m');
    border-top-right-radius: spacing('m');
    transform: translateY(100%);
  }
</style>
