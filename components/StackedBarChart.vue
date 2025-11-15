<script setup lang="ts">
  import type { Color } from '~/types/Color';

  const props = withDefaults(defineProps<{ data: { id: string; caption: string; amount: number; color: Color }[]; size?: 'large' | 'default' }>(), {
    size: 'default',
  });

  const total = computed(() => sumArray(props.data.map((item) => item.amount)));
</script>

<template>
  <div class="stacked-bar-chart">
    <div class="chart" :class="size">
      <div
        v-for="item in data.filter((item) => item.amount !== 0)"
        :key="item.id"
        :class="[item.id, `background-${item.color}`]"
        :style="{ width: (item.amount / total) * 100 + '%' }"
      />
    </div>
    <div class="counts">
      <span v-for="(item, index) in data"> {{ item.amount }}&nbsp;{{ item.caption }}<template v-if="index !== data.length - 1">, </template></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .chart {
    display: flex;
    gap: spacing('xs');
    width: 100%;
    border-radius: 6px;
    height: 12px;
    overflow: hidden;
    margin-bottom: spacing('xs');
    background: #efefef;

    &.large {
      height: 16px;
    }
  }

  .counts {
    @include breakpoint('small') {
      font-size: 20px;
    }
  }
</style>
