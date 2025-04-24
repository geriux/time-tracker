import { FC } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

type TimerButtonProps = {
  accessibilityLabel?: string;
  buttonStyle?: object;
  enabled?: boolean;
  icon: ImageSourcePropType;
  iconStyles?: object;
  onPress: () => void;
};

const TimerButton: FC<TimerButtonProps> = ({
  accessibilityLabel,
  buttonStyle,
  enabled = true,
  icon,
  iconStyles,
  onPress,
}) => {
  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!enabled}
      delayPressIn={0}
    >
      <View
        className="w-[76px] h-[76px] rounded-[38px]
    border border-2 border-primary justify-center items-center"
        style={buttonStyle}
      >
        <Image source={icon} style={iconStyles} resizeMode="center" />
      </View>
    </TouchableOpacity>
  );
};

export default TimerButton;
