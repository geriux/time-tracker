import { FC } from "react";
import { Bar, CartesianChart } from "victory-native";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import colors from "@/colors";
import dayjs from "dayjs";
import { defaultFont, BarChartData } from "@/common/stats";

type BarChartProps = {
  data: BarChartData[];
};

const weekdays = [...Array(7).keys()];

const BarChart: FC<BarChartProps> = ({ data }) => {
  const font = useFont(defaultFont, 12);
  return (
    <CartesianChart
      data={data.map((item) => ({ ...item }))}
      xKey="day"
      yKeys={["value"]}
      domainPadding={{ left: 35, right: 35, top: 0 }}
      axisOptions={{
        tickCount: {
          x: weekdays.length,
          y: 10,
        },
        font,
        formatXLabel(value) {
          return dayjs().day(value).format("ddd");
        },
        formatYLabel(value) {
          return `${dayjs.duration(value, "seconds").format("H")}h`;
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
