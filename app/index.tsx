import { Animated, View } from "react-native";
import { useRef, useState } from "react";
import GradientBackground from "@/components/gradient-background";
import ActivitiesList from "@/components/activities-list";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Timer from "@/components/timer";
import { ACTIVITIES, Activity } from "@/common/activities";

export default function Home() {
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const animationOpacity = useRef(new Animated.Value(1)).current;
  const hiddenOpacity = useRef(new Animated.Value(1)).current;

  const startActivity = (activity: Activity) => {
    Animated.timing(hiddenOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
    Animated.timing(animationOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      isInteraction: false,
    }).start(() => {
      setCurrentActivity(activity);
      Animated.timing(animationOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        isInteraction: false,
        delay: 50,
      }).start();
    });
  };

  const onTimerStopped = () => {
    setCurrentActivity(null);

    Animated.timing(hiddenOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      isInteraction: false,
    }).start(() => {});
  };

  const onFinished = (seconds: number) => {
    if (!currentActivity) return;
    console.log(`Ran activity ${currentActivity.name} for: ${seconds} seconds`);
    onTimerStopped();
  };

  const onPressActivity = (activity: Activity) => {
    startActivity(activity);
  };

  return (
    <View className="flex-1 bg-secondary pt-10">
      <GradientBackground height="50%" />

      <View className="flex-1 justify-between">
        <Animated.View style={{ opacity: animationOpacity }}>
          <Header userName="Demo" activity={currentActivity} />
        </Animated.View>

        <View className="mb-[45%]">
          <Animated.View style={{ opacity: animationOpacity }}>
            {currentActivity && (
              <View className="h-[35vh]">
                <Timer onStopped={onTimerStopped} onFinished={onFinished} />
              </View>
            )}
          </Animated.View>

          <Animated.View style={{ opacity: hiddenOpacity }}>
            {!currentActivity && (
              <ActivitiesList
                activities={ACTIVITIES}
                onPress={onPressActivity}
              />
            )}
          </Animated.View>
        </View>
      </View>

      <Animated.View
        className="absolute bottom-[50px] right-0"
        style={{ opacity: hiddenOpacity }}
      >
        {!currentActivity && <Footer />}
      </Animated.View>
    </View>
  );
}
