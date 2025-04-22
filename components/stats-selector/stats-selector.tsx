import { FC, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import StatsSelectorButton from "./stats-selector-button";
import { StatsSelectorOption } from "@/common/stats";

type StatsSelectorProps = {
  onPress: (value: string) => void;
  options: StatsSelectorOption[];
};

const StatsSelector: FC<StatsSelectorProps> = ({ onPress, options }) => {
  const [selected, setSelected] = useState(options[0].value);

  const onPressOption = (option: string) => {
    setSelected(option);

    onPress(option);
  };

  return (
    <View className="px-6 mt-4 items-center">
      <View className="flex-row">
        {options.map((option, index) => {
          const isSelected = selected === option.value;
          const isFirstButton = index === 0;
          const isLastButton = index === options.length - 1;
          const isDisabled = selected == option.value;

          return (
            <StatsSelectorButton
              isDisabled={isDisabled}
              isFirst={isFirstButton}
              isLast={isLastButton}
              isSelected={isSelected}
              key={option.value}
              label={option.label}
              onPress={onPressOption}
              value={option.value}
            />
          );
        })}
      </View>
    </View>
  );
};

export default StatsSelector;
