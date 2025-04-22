import { FC } from "react";
import { View } from "react-native";
import { Pie, PolarChart } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import PieChartCustomLabel from "./pie-chart-custom-label";
import { defaultFont, PieChartData } from "@/common/stats";

type PieChartProps = {
  data: PieChartData[];
};

const PieChart: FC<PieChartProps> = ({ data }) => {
  const font = useFont(defaultFont, 10);
  return (
    <View style={{ height: 230 }}>
      <PolarChart
        data={data.map((item) => ({
          label: item.label,
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
