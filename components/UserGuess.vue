<script setup lang="ts">
  import type { PuzzleGroupItemId } from '~/types/PuzzleGroupItemId';
  import { colors } from '~/content/colors';

  const { getColorByGroupItemId, initPuzzleById } = usePuzzle();
  const props = defineProps<{ guess: PuzzleGroupItemId[]; puzzleId: string }>();

  const puzzle = initPuzzleById(props.puzzleId);

  function getBackgroundColor(id: PuzzleGroupItemId) {
    const colorName = getColorByGroupItemId(id);
    const color = colors[colorName];
    const { r, g, b } = hexToRgb(color);
    return `rgba(${r},${g},${b},${colorName === 'violet' ? '0.5' : '0.66'})`;
  }
</script>

<template>
  <div class="user-guess">
    <div v-for="tile in guess" :key="tile" class="tile" :style="{ background: getBackgroundColor(tile) }">
      {{ puzzle?.items.find((item) => item.id === tile)?.caption }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-guess {
    display: flex;
    flex-wrap: wrap;
    gap: spacing('xs');
    line-height: 1em;
  }

  .tile {
    position: relative;
    border-radius: border-radius('default');
    padding: spacing('xxs');

    @include breakpoint('small') {
      padding: spacing('xs');
    }
  }

  .tiles {
    display: flex;
    flex-wrap: wrap;
    gap: spacing('xs');
  }
</style>
