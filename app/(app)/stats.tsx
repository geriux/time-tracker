import { View, Text } from "react-native";
import StatsSelector from "@/components/stats-selector";
import StatsSummary from "@/components/stats-summary";
import PieChart from "@/components/pie-chart";
import BarChart from "@/components/bar-chart";
import {
  STATS_SELECTOR_OPTIONS,
  STATS_SUMMARY_DATA,
  MOCK_DATA_BAR_CHART,
  MOCK_DATA_PIE_CHART,
} from "@/common/stats";

function Stats() {
  const onStatsSlectorPress = (value: string) => {
    console.log("Selected value: ", value);
  };

  return (
    <View className="flex-1 bg-secondary">
      <View className="px-6 pt-6 pb-2">
        <Text className="font-condensed text-5xl text-primary">
          Activity Stats
        </Text>
      </View>

      <StatsSummary data={STATS_SUMMARY_DATA} />

      <StatsSelector
        onPress={onStatsSlectorPress}
        options={STATS_SELECTOR_OPTIONS}
      />

      <View className="px-6">
        <Text className="font-light text-2xl text-primary mt-2">
          Total time per day
        </Text>
      </View>

      <View className="h-[170] px-6 mt-2">
        <BarChart data={MOCK_DATA_BAR_CHART} />
      </View>

      <View className="px-6">
        <Text className="font-light text-2xl text-primary mt-2">
          Time spent by category
        </Text>
      </View>

      <View className="h-[200] px-6 mt-2 pt-2">
        <PieChart data={MOCK_DATA_PIE_CHART} />
      </View>
    </View>
  );
}

export default Stats;
