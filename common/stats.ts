import { ACTIVITIES } from "./activities";
export const defaultFont = require("@/assets/fonts/SpaceMono-Regular.ttf");

export interface StatsSelectorOption {
  value: string;
  label: string;
}

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
  mostFrequent: string;
  longestSession: string;
  longestSessionActivity: string;
}

export const STATS_SUMMARY_DATA: StatsSummaryData = {
  totalTime: 19340,
  mostFrequent: "Meditation",
  longestSession: "1h 20m",
  longestSessionActivity: "Meditation",
};

export const MOCK_DATA_BAR_CHART: BarChartData[] = [
  { day: 1, value: 10800 },
  { day: 2, value: 14400 },
  { day: 3, value: 3600 },
  { day: 4, value: 28800 },
  { day: 5, value: 38000 },
  { day: 6, value: 21600 },
  { day: 7, value: 7200 },
];

export const MOCK_DATA_PIE_CHART: PieChartData[] = [
  {
    color: ACTIVITIES[0].color,
    label: ACTIVITIES[0].slug,
    value: 3600, // 1h
  },
  {
    color: ACTIVITIES[1].color,
    label: ACTIVITIES[1].slug,
    value: 5400, // 1.5h
  },
  {
    color: ACTIVITIES[2].color,
    label: ACTIVITIES[2].slug,
    value: 1800, // 30min
  },
  {
    color: ACTIVITIES[3].color,
    label: ACTIVITIES[3].slug,
    value: 7200, // 2h
  },
  {
    color: ACTIVITIES[4].color,
    label: ACTIVITIES[4].slug,
    value: 2700, // 45min
  },
  {
    color: ACTIVITIES[7].color,
    label: ACTIVITIES[7].slug,
    value: 4800, // 1h 20min
  },
  {
    color: ACTIVITIES[8].color,
    label: ACTIVITIES[8].slug,
    value: 3000, // 50min
  },
  {
    color: ACTIVITIES[9].color,
    label: ACTIVITIES[9].slug,
    value: 900, // 15min
  },
];
