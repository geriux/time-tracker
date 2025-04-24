import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import StatsSelector from "@/components/stats-selector";
import StatsSummary from "@/components/stats-summary";
import PieChart from "@/components/pie-chart";
import BarChart from "@/components/bar-chart";
import { STATS_SELECTOR_OPTIONS } from "@/common/stats";
import {
  getWeeklySummary,
  getTimePerDay,
  getTimeByCategory,
} from "@/common/api";
import {
  StatsSummaryData,
  StatsSelectorValue,
  BarChartData,
  PieChartData,
} from "@/common/stats";

function Stats() {
  const [currenStatsFilter, setCurrenStatsFilter] =
    useState<StatsSelectorValue>("week");
  // State to manage the weekly summary data
  const [weeklySummary, setWeeklySummary] = useState<StatsSummaryData | null>(
    null
  );
  const [isFetchingWeeklySummary, setIsFetchingWeeklySummary] = useState(true);
  const [hasFetchingWeeklySummaryFailed, setHasFetchingWeeklySummaryFailed] =
    useState(false);

  // State to manage the total time per day data
  const [timePerDay, setTimePerDay] = useState<BarChartData[] | null>(null);
  const [isFetchingTimePerDay, setIsFetchingTimePerDay] = useState(true);
  const [hasFetchingTimePerDayFailed, setHasFetchingTimePerDayFailed] =
    useState(false);

  // State to manage the time spent by category data
  const [timeByCategory, setTimeByCategory] = useState<PieChartData[] | null>(
    null
  );
  const [isFetchingTimeByCategory, setIsFetchingTimeByCategory] =
    useState(true);
  const [hasFetchingTimeByCategoryFailed, setHasFetchingTimeByCategoryFailed] =
    useState(false);

  const fetchWeeklySummary = async () => {
    setIsFetchingWeeklySummary(true);
    setHasFetchingWeeklySummaryFailed(false);
    try {
      const summary = await getWeeklySummary();
      setWeeklySummary(summary);
      setIsFetchingWeeklySummary(false);
    } catch (error) {
      setIsFetchingWeeklySummary(false);
      setHasFetchingWeeklySummaryFailed(true);
    }
  };

  const fetchTimePerDay = async (filter: StatsSelectorValue) => {
    setIsFetchingTimePerDay(true);
    setHasFetchingTimePerDayFailed(false);
    try {
      const timePerDay = await getTimePerDay(filter);
      setTimePerDay(timePerDay);
      setIsFetchingTimePerDay(false);
    } catch (error) {
      setIsFetchingTimePerDay(false);
      setHasFetchingTimePerDayFailed(true);
    }
  };

  const fetchTimeByCategory = async (filter: StatsSelectorValue) => {
    setIsFetchingTimeByCategory(true);
    setHasFetchingTimeByCategoryFailed(false);
    try {
      const timeByCategory = await getTimeByCategory(filter);
      setTimeByCategory(timeByCategory);
      setIsFetchingTimeByCategory(false);
    } catch (error) {
      setIsFetchingTimeByCategory(false);
      setHasFetchingTimeByCategoryFailed(true);
    }
  };

  useEffect(() => {
    fetchWeeklySummary();
  }, []);

  useEffect(() => {
    fetchTimePerDay(currenStatsFilter);
    fetchTimeByCategory(currenStatsFilter);
  }, [currenStatsFilter]);

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
        hasError={hasFetchingWeeklySummaryFailed}
        data={weeklySummary}
        isLoading={isFetchingWeeklySummary}
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
        <BarChart
          hasError={hasFetchingTimePerDayFailed}
          data={timePerDay}
          isLoading={isFetchingTimePerDay}
        />
      </View>

      <View className="px-6">
        <Text className="font-light text-2xl text-primary mt-2">
          Time spent by category
        </Text>
      </View>

      <View className="h-[200] px-6 mt-2 pt-2">
        <PieChart
          hasError={hasFetchingTimeByCategoryFailed}
          data={timeByCategory}
          isLoading={isFetchingTimeByCategory}
        />
      </View>
    </View>
  );
}

export default Stats;
