import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/common/auth";

import "@/global.css";
import colors from "@/colors";

export default function AppLayout() {
  const { user, authLoading } = useAuth() ?? {};

  if (authLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary }}
      edges={["top", "right", "left"]}
    >
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="stats"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
