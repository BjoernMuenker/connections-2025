import type { Color } from './Color';

export interface StackedBarChartItem {
  id: string;
  amount: number;
  caption: string;
  color: Color;
}
