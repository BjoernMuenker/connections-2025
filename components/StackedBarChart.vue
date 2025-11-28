<script setup lang="ts">
  import type { StackedBarChartItem } from '~/types/StackedBarChartItem';

  const props = withDefaults(defineProps<{ data: StackedBarChartItem[]; size?: 'large' | 'default' }>(), {
    size: 'default',
  });

  const total = computed(() => sumArray(props.data.map((item) => item.amount)));

  const dataWithNonZeroValues = computed(() => props.data.filter((item) => item.amount !== 0));
</script>

<template>
  <div class="stacked-bar-chart">
    <div class="chart" :class="[size, { empty: total === 0 }]">
      <div
        v-for="item in dataWithNonZeroValues"
        :key="item.id"
        :class="[item.id, `background-${item.color}`]"
        :style="{ width: (item.amount / total) * 100 + '%' }"
      />
    </div>
    <div class="counts">
      <template v-if="dataWithNonZeroValues.length === 0">keine Daten</template>
      <template v-else>
        <span v-for="(item, index) in dataWithNonZeroValues">
          {{ item.amount }}&nbsp;{{ item.caption }}<template v-if="index !== dataWithNonZeroValues.length - 1">, </template>
        </span>
      </template>
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

    &.empty {
      background: color('grey-100');
    }

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
