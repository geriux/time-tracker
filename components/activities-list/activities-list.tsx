import { Animated, Text, View } from "react-native";
import { FC, useRef } from "react";
import { Activity } from "@/common/activities";
import ActivityButton from "./activity-button";

const ITEM_WIDTH = 158;

type ActivitiesListProps = {
  activities: Activity[];
  onPress: (activity: Activity) => void;
};

const ActivitiesList: FC<ActivitiesListProps> = ({ activities, onPress }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const getAnimatedStyle = (index: number) => {
    const inputRange = [
      (index - 3) * ITEM_WIDTH,
      (index - 2) * ITEM_WIDTH,
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 0.8, 1, 1],
    });
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-40, -20, 0, 0],
    });

    return {
      transform: [{ scale }, { translateX }],
    };
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
    }
  );

  return (
    <View>
      <Text className="font-condensed text-4xl text-primary text-center mb-8">
        What do you want to{"\n"}track today?
      </Text>

      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        decelerationRate={0}
        snapToInterval={ITEM_WIDTH}
        contentContainerStyle={{
          paddingLeft: 30,
          paddingVertical: 30,
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {activities.map((activity: Activity, index: number) => {
          return (
            <Animated.View style={getAnimatedStyle(index)} key={activity.slug}>
              <ActivityButton
                activity={activity}
                onPress={onPress}
                size={ITEM_WIDTH}
              />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default ActivitiesList;
