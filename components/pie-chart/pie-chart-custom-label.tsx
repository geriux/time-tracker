import dayjs from "dayjs";
import { getActivityIcon } from "@/common/activities";
import colors from "@/colors";
import {
  useImage,
  Group,
  Text,
  Image,
  ColorMatrix,
  DataSource,
  type SkFont,
} from "@shopify/react-native-skia";
import { type PieSliceData } from "victory-native";

const ICON_SIZE = 20;
const ICON_OFFSET = 2;

function getValueLabel(value: number) {
  const duration = dayjs.duration(value, "seconds");

  if (duration.asHours() >= 1) {
    return `${duration.format("H")}h`;
  } else if (duration.asMinutes() >= 1) {
    return `${duration.format("m")}m`;
  }
  return `${duration.format("s")}s`;
}

const PieChartCustomLabel = ({
  slice,
  font,
  position,
}: {
  slice: PieSliceData;
  font: SkFont | null;
  position: { x: number; y: number };
}) => {
  const { x, y } = position;
  const label = slice.label;
  const icon = getActivityIcon(label) as DataSource;
  const image = useImage(icon);
  const labelValue = getValueLabel(slice.value);

  return (
    <Group transform={[{ translateY: 0, translateX: 0 }]}>
      <Text
        x={x - ICON_SIZE / 2 + ICON_OFFSET}
        y={y - ICON_SIZE / 2}
        text={labelValue}
        font={font}
        color={colors.accent}
      />

      <Image
        image={image}
        fit="contain"
        x={x - ICON_SIZE / 2}
        y={y - ICON_SIZE / 2}
        width={ICON_SIZE}
        height={ICON_SIZE}
      >
        <ColorMatrix
          matrix={[
            0, 0, 0, 0, 255, 0, 0, 0, 0, 255, 0, 0, 0, 0, 255, 0, 0, 0, 1, 0,
          ]}
        />
      </Image>
    </Group>
  );
};

export default PieChartCustomLabel;
