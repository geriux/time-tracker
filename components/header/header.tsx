import { FC } from "react";
import { View, Text } from "react-native";
import { Activity } from "@/common/activities";

type HeaderProps = {
  activity: Activity | null;
  userName: string;
};

const Header: FC<HeaderProps> = ({ activity, userName }) => {
  const heading = activity?.name || "Welcome back,";
  const subHeading = activity ? "Activity" : userName;

  return (
    <View className="px-8">
      <Text className="font-condensed text-5xl text-accent">{heading}</Text>
      <Text className="font-condensed text-7xl text-neutral mt-2">
        {subHeading}
      </Text>
    </View>
  );
};

export default Header;
