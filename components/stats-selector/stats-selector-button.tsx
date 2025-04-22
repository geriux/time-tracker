import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";

type StatsSelectorButtonProps = {
  isDisabled: boolean;
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  label: string;
  onPress: (value: string) => void;
  value: string;
};

const hitSlop = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15,
};

const StatsSelectorButton: FC<StatsSelectorButtonProps> = ({
  isDisabled,
  isFirst,
  isLast,
  isSelected,
  label = "",
  onPress,
  value,
}) => {
  const onPressButton = () => {
    if (!isDisabled) {
      onPress(value);
    }
  };

  const selectedButtonStyles = isSelected ? "bg-primary" : "";
  const selectedButtonTextStyles = isSelected ? "text-neutral" : "text-primary";
  const firstButtonStyles = isFirst ? "rounded-l-[16px] " : "";
  const lastButtonStyles = isLast ? "rounded-r-[16px] border-r-[1px]" : "";

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={isDisabled}
      hitSlop={hitSlop}
      onPress={onPressButton}
    >
      <View
        className={`border border-r-[0] border-primary ${selectedButtonStyles} ${firstButtonStyles} ${lastButtonStyles}`}
      >
        <Text
          className={`py-3 px-7 font-condensed leading-[18px] ${selectedButtonTextStyles}`}
        >
          {label.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StatsSelectorButton;
