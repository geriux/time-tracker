import { FC } from "react";
import { View, Text } from "react-native";
import { StatsSummaryData } from "@/common/stats";
import dayjs from "dayjs";

type StatsSummaryProps = {
  data: StatsSummaryData;
};

function getTotalTime(value: number) {
  const duration = dayjs.duration(value, "seconds");

  if (duration.asHours() >= 1) {
    return `${duration.format("H")}h ${duration.format("m")}m`;
  } else if (duration.asMinutes() >= 1) {
    return `${duration.format("m")}m`;
  }
  return `${duration.format("s")}s`;
}

const StatsSummary: FC<StatsSummaryProps> = ({ data }) => {
  const { totalTime, mostFrequent, longestSession, longestSessionActivity } =
    data;

  return (
    <View className="px-6">
      <Text className="font-condensed text-3xl text-primary mt-2">
        This Week
      </Text>

      <View className="bg-primary rounded-2xl px-4 py-2 mt-2">
        <Text className="font-light text-neutral text-lg tracking-wide">
          {`Total time: ${getTotalTime(totalTime)}`}
        </Text>
        <Text className="font-light text-neutral text-lg tracking-wide">
          {`Most frequent: ${mostFrequent}`}
        </Text>
        <Text className="font-light text-neutral text-lg tracking-wide">
          {`Longest session: ${longestSession} (${longestSessionActivity})`}
        </Text>
      </View>
    </View>
  );
};

export default StatsSummary;
