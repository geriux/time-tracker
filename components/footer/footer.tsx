import { router, Link } from "expo-router";
import { Alert, Image, View, TouchableOpacity } from "react-native";
import { useAuth } from "@/common/auth";

const Footer = () => {
  const { signOut } = useAuth() ?? {};

  const onLogOut = () => {
    if (signOut) {
      signOut({
        onLogout: () => {
          router.replace("/");
        },
        onLogoutError: (message: string) => {
          Alert.alert("Logout error:", message);
        },
      });
    }
  };

  return (
    <View className="flex-row justify-between px-8">
      <Link href="/stats" asChild>
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
      </Link>

      <TouchableOpacity activeOpacity={0.6} onPress={onLogOut}>
        <View
          className="w-[60px] h-[60px] rounded-[30px] 
      border border-primary justify-center items-center ml-3"
        >
          <Image
            source={require("@/assets/images/logout.png")}
            className="w-[24px] h-[24px]"
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
