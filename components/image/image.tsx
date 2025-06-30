import { FC } from "react";
import { ActivityIndicator } from "react-native";
import colors from "@/colors";
import { Image, ImageContentFit } from "expo-image";
import useRemoteImage from "@/common/useRemoteImage";

type ImageProps = {
  source: string;
  width: number;
  height: number;
  resizeMode?: ImageContentFit | undefined;
};

const ImageComponent: FC<ImageProps> = ({
  source,
  width,
  height,
  resizeMode = "cover",
}) => {
  const { image, error } = useRemoteImage(source);

  if (!image || error) {
    return <ActivityIndicator size="small" color={colors.primary} />;
  }

  return (
    <Image
      style={{ width, height }}
      source={{ uri: image, cacheKey: source }}
      contentFit={resizeMode}
    />
  );
};

export default ImageComponent;
