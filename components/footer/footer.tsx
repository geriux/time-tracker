import { Image, View, TouchableOpacity } from "react-native";

const Footer = () => {
  return (
    <View className="flex-row justify-between px-8">
      <TouchableOpacity activeOpacity={0.6}>
        <View
          className="w-[60px] h-[60px] rounded-[30px] 
      border border-primary justify-center items-center"
        >
          <Image
            source={require("@/assets/images/stats.png")}
            className="w-[24px] h-[24px]"
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
