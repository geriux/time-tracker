import { FC } from "react";
import { ActivityIndicator, View, Text as RNText } from "react-native";
import { Bar, CartesianChart } from "victory-native";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import colors from "@/colors";
import dayjs from "dayjs";
import { defaultFont } from "@/common/theme";
import { BarChartData } from "@/common/types";
import { FirebaseError } from "firebase/app";

type BarChartProps = {
  data: BarChartData[] | null;
  hasError: FirebaseError | null;
  isLoading: boolean;
};

const weekdays = [...Array(7).keys()];

function hasNoStatsData(data: { day: number; value: number }[]) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return total === 0;
}

function getTotalTime(value?: number) {
  if (!value) return "";

  const duration = dayjs.duration(value, "seconds");
  const totalMinutes = duration.asMinutes();
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  if (totalMinutes < 60) {
    return `${Math.floor(totalMinutes)}m`;
  }

  if (minutes < 30) {
    return `${hours}h`;
  }
  return `${hours}h 30m`;
}

const BarChart: FC<BarChartProps> = ({ data, isLoading, hasError }) => {
  const font = useFont(defaultFont, 12);
  if (isLoading) {
    return (
      <View className="absolute top-0 bottom-0 left-0 right-0 z-10 items-center justify-center">
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (hasError && !isLoading) {
    return (
      <RNText className="text-primary text-ml font-light self-center mt-20">
        Error loading data
      </RNText>
    );
  }

  if (!data || hasNoStatsData(data) || data.length === 0) {
    return (
      <RNText className="text-primary text-ml font-light self-center mt-20">
        No data available
      </RNText>
    );
  }

  return (
    <CartesianChart
      data={data?.map((item) => ({ ...item })) || []}
      xKey="day"
      yKeys={["value"]}
      domainPadding={{ left: 35, right: 35, top: 0 }}
      axisOptions={{
        tickCount: {
          x: weekdays.length,
          y: 6,
        },
        font,
        formatXLabel(value) {
          return dayjs().day(value).format("ddd");
        },
        formatYLabel(value) {
          return getTotalTime(value);
        },
        lineColor: colors.tertiary,
        labelColor: colors.primary,
      }}
    >
      {({ points, chartBounds }) => (
        <Bar
          chartBounds={chartBounds}
          points={points.value}
          roundedCorners={{
            topLeft: 8,
            topRight: 8,
          }}
          barWidth={30}
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, 400)}
            colors={[colors.primary, colors.secondary, colors.tertiary]}
          />
        </Bar>
      )}
    </CartesianChart>
  );
};

export default BarChart;
