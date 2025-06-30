import { useState, useMemo } from "react";
import { View, Text } from "react-native";
import StatsSelector from "@/components/stats-selector";
import StatsSummary from "@/components/stats-summary";
import PieChart from "@/components/pie-chart";
import BarChart from "@/components/bar-chart";
import { STATS_SELECTOR_OPTIONS, StatsSelectorValue } from "@/common/types";
import {
  getStatsDateRange,
  parseWeeklySummary,
  parseTimePerDay,
  parseTimeByCategory,
} from "@/common/helpers";
import { useGetActivityLogs } from "@time-tracker/activities/react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const DEFAULT_STATS_SELECTOR: StatsSelectorValue = "week";

function Stats() {
  const currentDate = dayjs();
  const startOfWeek = currentDate.startOf("isoWeek").format();
  const endDate = dayjs().format();

  const [currenStatsFilter, setCurrenStatsFilter] =
    useState<StatsSelectorValue>(DEFAULT_STATS_SELECTOR);

  const { startDate } = useMemo(() => {
    const range = getStatsDateRange(currenStatsFilter);
    return {
      startDate: dayjs().startOf(range).format(),
    };
  }, [currenStatsFilter]);

  const { data, isLoading, error } = useGetActivityLogs({
    start: startDate,
    end: endDate,
  });

  const weeklySummary = parseWeeklySummary(data, startOfWeek);
  const timePerDay = parseTimePerDay(data);
  const timeByCategory = parseTimeByCategory(data);

  const onStatsSelectorPress = (value: StatsSelectorValue) => {
    setCurrenStatsFilter(value);
  };

  return (
    <View className="flex-1 bg-secondary">
      <View className="px-6 pt-6 pb-2">
        <Text className="font-condensed text-5xl text-primary">
          Activity Stats
        </Text>
      </View>

      <StatsSummary
        hasError={error}
        data={weeklySummary}
        isLoading={isLoading}
      />

      <StatsSelector
        onPress={onStatsSelectorPress}
        options={STATS_SELECTOR_OPTIONS}
      />

      <View className="px-6">
        <Text className="font-light text-2xl text-primary mt-2">
          Total time per day
        </Text>
      </View>

      <View className="h-[170] px-6 mt-2">
        <BarChart hasError={error} data={timePerDay} isLoading={isLoading} />
      </View>

      <View className="px-6">
        <Text className="font-light text-2xl text-primary mt-2">
          Time spent by category
        </Text>
      </View>

      <View className="h-[200] px-6 mt-2 pt-2">
        <PieChart
          hasError={error}
          data={timeByCategory}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}

export default Stats;
