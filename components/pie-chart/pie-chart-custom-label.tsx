import dayjs from "dayjs";
import colors from "@/colors";
import {
  useSVG,
  ImageSVG,
  Group,
  Text,
  Paint,
  BlendColor,
  rect,
  fitbox,
  type SkFont,
} from "@shopify/react-native-skia";
import { type PieSliceData } from "victory-native";
import useRemoteImage from "@/common/useRemoteImage";
import useLocalSVG from "@/common/useLocalSVG";

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
  numberOfSlices,
  icon,
}: {
  slice: PieSliceData;
  font: SkFont | null;
  position: { x: number; y: number };
  numberOfSlices: number;
  icon: string;
}) => {
  const { x, y } = position;
  const { image: imageURL } = useRemoteImage(icon);

  const localSVG = useLocalSVG(imageURL);
  const remoteSVG = useSVG(imageURL);

  const svg = imageURL?.startsWith("http") ? remoteSVG : localSVG;

  const labelValue = getValueLabel(slice.value);
  const iconSize = ICON_SIZE * (numberOfSlices <= 4 ? 1.5 : 1);
  const iconOffset = ICON_OFFSET * (numberOfSlices <= 4 ? 4 : 1);

  if (!svg) return null;

  const src = rect(0, 0, svg.width(), svg.height());
  const dst = rect(0, 0, iconSize, iconSize);
  const transform = [
    { translateX: x - iconSize / 2 },
    { translateY: y - iconSize / 2 },
    ...fitbox("contain", src, dst),
  ];

  return (
    <Group transform={[{ translateY: 0, translateX: 0 }]}>
      <Text
        x={x - iconSize / 2 + iconOffset}
        y={y - iconSize / 2}
        text={labelValue}
        font={font}
        color={colors.accent}
      />

      <Group
        transform={transform}
        layer={
          <Paint>
            <BlendColor color="white" mode="srcIn" />
          </Paint>
        }
      >
        <ImageSVG
          svg={svg}
          x={0}
          y={0}
          width={svg.width()}
          height={svg.height()}
        />
      </Group>
    </Group>
  );
};

export default PieChartCustomLabel;
