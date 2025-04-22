import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import "@/global.css";
import colors from "@/colors";

export default function RootLayout() {
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
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaView>
  );
}
