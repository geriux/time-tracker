export const defaultFont = require("@/assets/fonts/SpaceMono-Regular.ttf");

export interface StatsSelectorOption {
  value: StatsSelectorValue;
  label: string;
}

export type StatsSelectorValue = "week" | "month";

export const STATS_SELECTOR_OPTIONS: StatsSelectorOption[] = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

export interface BarChartData {
  day: number;
  value: number;
}

export interface PieChartData {
  color: string;
  label: string;
  value: number;
}

export interface StatsSummaryData {
  totalTime: number;
  mostFrequent: string | null;
  longestSession: { duration: number; category: string };
}
