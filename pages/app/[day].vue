<script setup lang="ts">
  import Puzzle from '~/components/Puzzle.vue';

  const route = useRoute();
  const puzzleId = route.params.day as string;

  definePageMeta({
    layout: 'app',
  });
</script>

<template>
  <Puzzle :puzzle-id="puzzleId" />
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
    color: white;
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
