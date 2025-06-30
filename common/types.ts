import { OpUnitType } from "dayjs";

export interface Activity {
  id: string;
  color: string;
  icon: string;
  name: string;
  slug: string;
}

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
  name: string;
  icon: string;
}

export type DayRange = OpUnitType | "isoWeek";

export type CategoryTotals = {
  [slug: string]: PieChartData;
};

export interface LongestSession {
  activityName: string;
  duration: number;
  category: string;
}

export interface StatsSummaryData {
  totalTime: number;
  mostFrequent: string | null;
  longestSession: LongestSession;
}
