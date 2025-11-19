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
    return props.group.items
      .map((item) => item.caption)
      .flat()
      .join(', ');
  });
</script>

<template>
  <div ref="rootRef" class="puzzle-group" :class="`background-${color}`" :data-group-id="group.id">
    <div class="title">{{ group.caption }}</div>
    <div class="items">
      <span class="item-wrapper" v-for="(item, index) in props.group.items" :key="item.id">
        <span class="item">{{ item.caption }} </span>
        <span class="separator" v-if="index < props.group.items.length - 1">, </span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .puzzle-group {
    width: 100%;
    line-height: 1em;
    border-radius: border-radius('default');
    // text-transform: uppercase;
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
      @include var-font-weight(600);
    }
  }

  .item {
    white-space: nowrap;
  }
</style>
