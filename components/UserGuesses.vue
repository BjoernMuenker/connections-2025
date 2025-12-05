<script setup lang="ts">
  import type { PuzzleGroupItemId } from '~/types/PuzzleGroupItemId';
  import BaseTile from './BaseTile.vue';
  import { colors } from '~/content/colors';
  import UserGuess from './UserGuess.vue';

  const { getColorByGroupItemId, initPuzzleById } = usePuzzle();
  const props = defineProps<{ guesses: PuzzleGroupItemId[][]; puzzleId: string }>();

  const puzzle = initPuzzleById(props.puzzleId);
</script>

<template>
  <BaseTile class="user-guesses">
    <div class="heading-medium">Spielzüge</div>
    <div class="guesses">
      <div v-for="(guess, index) in guesses" :key="index" class="entry">
        <div class="index">{{ index + 1 }}</div>
        <UserGuess :guess="guess" :puzzle-id="puzzleId" />
      </div>
    </div>
  </BaseTile>
</template>

<style lang="scss" scoped>
  .base-tile .heading-medium {
    margin-bottom: spacing('l');
    @include var-font-weight(500);
  }

  .user-guesses {
    padding: spacing('m');

    @include breakpoint('small') {
      padding: spacing('l');
    }
  }

  .guesses {
    display: flex;
    flex-direction: column;
    gap: spacing('m');
    font-variant-numeric: tabular-nums;

    @include breakpoint('small') {
      gap: spacing('m');
    }
  }

  .entry {
    display: flex;
    gap: spacing('xs');
    line-height: 1em;
  }

  .index {
    text-align: right;
    margin-right: spacing('xs');
    padding: spacing('xxs') 0;

    @include breakpoint('medium') {
      padding: spacing('xs') 0;
    }
  }
</style>
