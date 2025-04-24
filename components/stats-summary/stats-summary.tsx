import { FC } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { StatsSummaryData } from "@/common/stats";
import dayjs from "dayjs";
import colors from "@/colors";
import { getActivityName } from "@/common/activities";

type StatsSummaryProps = {
  data: StatsSummaryData | null;
  hasError: boolean;
  isLoading: boolean;
};

function getTotalTime(value?: number) {
  if (!value) {
    return "";
  }
  const duration = dayjs.duration(value, "seconds");

  if (duration.asHours() >= 1) {
    return `${duration.format("H")}h ${duration.format("m")}m`;
  } else if (duration.asMinutes() >= 1) {
    return `${duration.format("m")}m`;
  }
  return `${duration.format("s")}s`;
}

const StatsSummary: FC<StatsSummaryProps> = ({ data, isLoading, hasError }) => {
  const { totalTime, mostFrequent, longestSession } = data || {};
  const mostFrequentActivity = getActivityName(mostFrequent || "");
  const longestSessionActivity = getActivityName(
    longestSession?.category || ""
  );

  return (
    <View className="px-6">
      <Text className="font-condensed text-3xl text-primary mt-2">
        This Week
      </Text>

      <View className="bg-primary rounded-2xl px-4 py-2 mt-2 min-h-[88]">
        {isLoading && (
          <View className="absolute top-0 bottom-0 left-0 right-0 z-10 items-center justify-center">
            <ActivityIndicator size="small" color={colors.secondary} />
          </View>
        )}

        {hasError && !isLoading && (
          <Text className="text-secondary text-ml font-light self-center mt-9">
            Error loading data
          </Text>
        )}

        {!isLoading && (!data || !totalTime) ? (
          <Text className="text-secondary text-ml font-light self-center mt-9">
            No data available
          </Text>
        ) : (
          <>
            <Text className="text-neutral text-lg tracking-wide">
              <Text className="font-boldCustom">Total time: </Text>
              <Text className="font-light ">{getTotalTime(totalTime)}</Text>
            </Text>
            <Text className="text-neutral text-lg tracking-wide">
              <Text className="font-boldCustom">Most frequent: </Text>
              <Text className="font-light">{mostFrequentActivity}</Text>
            </Text>
            <Text className="text-neutral text-lg tracking-wide">
              <Text className="font-boldCustom">Longest session: </Text>
              <Text className="font-light">{`${getTotalTime(
                longestSession?.duration
              )} (${longestSessionActivity})`}</Text>
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default StatsSummary;
