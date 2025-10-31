<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { PuzzleGroup } from '~/types/PuzzleGroup';

  const props = defineProps<{ group: PuzzleGroup }>();

  const { getColorByGroupId } = usePuzzle();

  const route = useRoute();

  const rootRef = ref<HTMLElement>();

  const color = computed(() => {
    return getColorByGroupId(props.group.id);
  });

  const joinedItems = computed(() => {
    const player = route.params.player;
    const day = route.params.day;

    return props.group.items
      .map((item) => item.caption)
      .flat()
      .join(', ');
  });
</script>

<template>
  <div ref="rootRef" class="puzzle-group" :class="`background-${color}`" :data-group-id="group.id">
    <div class="title">{{ group.caption }}</div>
    <div class="items">{{ joinedItems }}</div>
  </div>
</template>

<style lang="scss" scoped>
  .puzzle-group {
    width: 100%;
    line-height: 1em;
    border-radius: 6px;
    text-transform: uppercase;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: spacing('xxs');
    user-select: none;
    padding: 0 spacing('s');
    @include fluid-value('font-size', 17, 22);

    .title {
      font-weight: 700;
    }
  }
</style>
