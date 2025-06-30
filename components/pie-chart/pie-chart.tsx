import { FC } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Pie, PolarChart } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import PieChartCustomLabel from "./pie-chart-custom-label";
import { PieChartData } from "@/common/types";
import { defaultFont } from "@/common/theme";
import colors from "@/colors";
import { FirebaseError } from "firebase/app";

type PieChartProps = {
  data: PieChartData[] | null;
  hasError: FirebaseError | null;
  isLoading: boolean;
};

const PieChart: FC<PieChartProps> = ({ data, isLoading, hasError }) => {
  const font = useFont(defaultFont, 10);

  if (isLoading) {
    return (
      <View className="absolute top-0 bottom-0 left-0 right-0 z-10 items-center justify-center">
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (hasError && !isLoading) {
    return (
      <Text className="text-primary text-ml font-light self-center mt-20">
        Error loading data
      </Text>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Text className="text-primary text-ml font-light self-center mt-20">
        No data available
      </Text>
    );
  }

  return (
    <View style={{ height: 230 }}>
      <PolarChart
        data={data.map((item) => ({
          label: item.icon,
          value: item.value,
          color: item.color,
        }))}
        labelKey={"label"}
        valueKey={"value"}
        colorKey={"color"}
      >
        <Pie.Chart innerRadius={55}>
          {({ slice }) => {
            return (
              <>
                <Pie.Slice>
                  <Pie.Label radiusOffset={0.73}>
                    {(position) => (
                      <PieChartCustomLabel
                        position={position}
                        slice={slice}
                        font={font}
                        numberOfSlices={data.length}
                        icon={slice.label}
                      />
                    )}
                  </Pie.Label>
                </Pie.Slice>
              </>
            );
          }}
        </Pie.Chart>
      </PolarChart>
    </View>
  );
};

export default PieChart;
