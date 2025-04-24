import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { router } from "expo-router";
import GradientBackground from "@/components/gradient-background";
import { useAuth } from "@/common/auth";
import colors from "@/colors";

function SignIn() {
  const { signIn } = useAuth() ?? {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const onLogin = async () => {
    if (!signIn) return;
    setError("");
    setLoadingLogin(true);
    Keyboard.dismiss();

    if (!email || !password) {
      setLoadingLogin(false);
      setError("Please enter your email and password");
      return;
    }

    try {
      await signIn(
        email,
        password,
        () => {
          setLoadingLogin(false);
          router.replace("/");
        },
        (message) => {
          setLoadingLogin(false);
          setError(message);
        }
      );
    } catch (error) {
      setLoadingLogin(false);
      setError("An unknown error occurred during login");
    }
  };

  return (
    <View className="flex-1 relative">
      <KeyboardAvoidingView
        className="flex-1 bg-secondary"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {loadingLogin && (
          <View
            className="bg-gray-900 absolute 
        top-0 bottom-0 left-0 right-0 z-10 items-center justify-center opacity-[0.3]"
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mt-[40vh] justify-center items-center">
            {error && <Text className="text-red-900 mb-4">{error}</Text>}

            <TextInput
              className="border border-primary rounded-2xl 
            pt-1 pb-0 px-3 mb-4 w-[90%] text-primary text-xl placeholder:text-primary 
            font-light h-[50px] leading-none"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete={"off"}
              autoCorrect={false}
            />
            <TextInput
              className="border border-primary rounded-2xl 
            pt-1 pb-0 px-3 mb-4 w-[90%] text-primary text-xl placeholder:text-primary 
            font-light h-[50px] leading-none"
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoComplete={"off"}
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={onLogin}
            />

            <TouchableOpacity onPress={onLogin} activeOpacity={0.7}>
              <View className="bg-primary p-3 rounded rounded-full">
                <Text className="text-accent font-condensed text-xl px-6">
                  LOGIN
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <GradientBackground height={"30%"} />
    </View>
  );
}

export default SignIn;
