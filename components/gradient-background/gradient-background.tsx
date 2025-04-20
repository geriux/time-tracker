import { FC } from "react";
import { DimensionValue, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/colors";

type GradientBackgroundProps = {
  gradientColors?: [string, string, ...string[]];
  height?: DimensionValue;
  locations?: [number, number, ...number[]];
};

const GradientBackground: FC<GradientBackgroundProps> = ({
  gradientColors = [colors.primary, colors.secondary],
  height = "100%",
  locations = [0, 1],
}) => {
  return (
    <LinearGradient
      colors={gradientColors}
      locations={locations}
      style={{
        ...StyleSheet.absoluteFillObject,
        height,
      }}
    />
  );
};

export default GradientBackground;
