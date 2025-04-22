export interface StatsSelectorOption {
  value: string;
  label: string;
}

export const STATS_SELECTOR_OPTIONS: StatsSelectorOption[] = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];
