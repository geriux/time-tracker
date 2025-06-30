import { Text, View, TouchableOpacity } from "react-native";
import GradientBackground from "@/components/gradient-background";
import colors from "@/colors";
import { Activity } from "@/common/types";
import Image from "@/components/image";

const boxShadow = `0 4 2 0 ${colors.shadow}`;

function ActivityButton({
  activity,
  onPress,
  size,
}: {
  activity: Activity;
  onPress: (activity: Activity) => void;
  size: number;
}) {
  const onPressActivity = () => {
    onPress(activity);
  };

  return (
    <TouchableOpacity onPress={onPressActivity} activeOpacity={0.8}>
      <View
        className="bg-neutral mr-[15px] rounded-[19px]
     justify-center items-center  overflow-hidden px-4"
        style={{ width: size, height: size, boxShadow }}
      >
        <GradientBackground
          gradientColors={[colors.neutral, colors.secondary]}
          locations={[0, 0.96]}
          height={size}
        />

        <View className="w-[75px] h-[75px] mb-4">
          <Image
            source={activity.icon}
            width={80}
            height={80}
            resizeMode="contain"
          />
        </View>
        <View className="bg-primary w-[100%] h-[36px] rounded-[16px] items-center justify-center">
          <Text className="text-neutral font-condensed text-xl text-center pb-[0.5px]">
            {activity.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ActivityButton;
