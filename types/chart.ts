export interface ChartDataPoint {
  time: number;
  focusTime: number;
  Att?: number;
  Med?: number;
  Var?: number;
  rawHex?: string;
  [key: string]: unknown;
}
