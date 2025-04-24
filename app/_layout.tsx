import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/common/auth";

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
      <StatusBar style="light" />
    </AuthProvider>
  );
}
