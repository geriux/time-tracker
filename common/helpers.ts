import {
  BarChartData,
  CategoryTotals,
  DayRange,
  PieChartData,
  StatsSelectorValue,
  LongestSession,
} from "@/common/types";
import { GetActivityLogsData } from "@time-tracker/activities";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter);

export function getStatsDateRange(range: StatsSelectorValue): DayRange {
  switch (range) {
    case "week": {
      return "isoWeek";
    }
    case "month": {
      return "month";
    }
    default: {
      return "isoWeek";
    }
  }
}

export function parseWeeklySummary(
  data: GetActivityLogsData | undefined,
  weekStartDate?: string
) {
  const categoryCount: Record<string, number> = {};
  let totalSeconds = 0;
  let longestSession: LongestSession = {
    activityName: "",
    duration: 0,
    category: "",
  };

  const logs = data?.user?.logs || [];

  const filteredLogs = weekStartDate
    ? logs.filter((log) => dayjs(log.startTime).isSameOrAfter(weekStartDate))
    : logs;

  for (const log of filteredLogs) {
    totalSeconds += log.duration;
    const category = log.activity.slug;
    categoryCount[category] = (categoryCount[category] || 0) + 1;

    if (log.duration > longestSession.duration) {
      longestSession = {
        duration: log.duration,
        category: category,
        activityName: log.activity.name,
      };
    }
  }

  const categories = Object.keys(categoryCount);
  const mostFrequent = categories.length
    ? categories.reduce((a, b) =>
        categoryCount[a] >= categoryCount[b] ? a : b
      )
    : null;

  return {
    totalTime: totalSeconds,
    mostFrequent,
    longestSession,
  };
}

export function parseTimePerDay(data: GetActivityLogsData | undefined) {
  const logs = data?.user?.logs || [];

  const weekdayTotals: Record<number, number> = Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => [i + 1, 0])
  );

  for (const log of logs) {
    const startTime = dayjs(log.startTime);
    const dayOfWeek = startTime.isoWeekday();
    weekdayTotals[dayOfWeek] += log.duration;
  }

  const timePerDayData: BarChartData[] = Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    value: weekdayTotals[i + 1],
  }));
  return timePerDayData;
}

export function parseTimeByCategory(data: GetActivityLogsData | undefined) {
  const logs = data?.user?.logs || [];

  const categoryTotals = logs.reduce<CategoryTotals>((acc, log) => {
    const slug = log.activity.slug;
    if (acc[slug]) {
      acc[slug].value += log.duration;
    } else {
      acc[slug] = {
        label: slug,
        value: log.duration,
        color: log.activity.color,
        name: log.activity.name,
        icon: log.activity.icon,
      };
    }
    return acc;
  }, {});

  return Object.entries(categoryTotals).map(
    ([, { label, value, color, icon }]) => ({
      label,
      value,
      color,
      icon,
    })
  ) as PieChartData[];
}
