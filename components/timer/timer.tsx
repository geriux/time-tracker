import { FC, useEffect, useState, useRef } from "react";
import { Alert, View, Text } from "react-native";
import TimerButton from "./timer-button";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

type TimerProps = {
  onFinished: (seconds: number) => void;
  onStopped: () => void;
};

const Timer: FC<TimerProps> = ({ onFinished, onStopped }) => {
  const [timerDuration, setTimerDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimerDuration((prevDuration) => {
          return prevDuration + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, [isRunning]);

  const toggleTimer = () => {
    if (!isRunning) {
      // Adding 1 second to the timer to display instant feedback in the UI
      // before the interval.
      setTimerDuration(timerDuration + 1);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const handleStopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;

    onStopped();
  };

  const stopTimerConfirmation = () => {
    Alert.alert(
      "Stopping timer",
      "Are you sure you want to stop the current running timer? No data will be saved.",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleStopTimer() },
      ]
    );
  };

  const stopTimer = () => {
    setIsRunning(false);

    if (timerDuration > 0) {
      stopTimerConfirmation();
      return;
    }

    handleStopTimer();
  };

  const onTimerFinished = () => {
    setIsRunning(false);

    Alert.alert(
      "Finishing timer",
      "Are you sure you want to finish the current running timer?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => onFinished(timerDuration) },
      ]
    );
  };

  const formattedTime = dayjs
    .duration(timerDuration, "seconds")
    .format("HH:mm:ss");

  const toggleTimerIcon = !isRunning
    ? require("@/assets/images/timer-play.png")
    : require("@/assets/images/timer-pause.png");

  const toggleTimerIconStyles = [
    { width: 43, height: 40 },
    !isRunning && { marginLeft: 4 },
  ];

  const finishButtonStyles = [
    { opacity: 0.5 },
    timerDuration > 0 && { opacity: 1 },
  ];

  return (
    <>
      <Text className="font-condensed text-[96px] text-primary text-center mb-6">
        {formattedTime}
      </Text>

      <View className="flex-row items-center justify-center">
        <TimerButton
          icon={require("@/assets/images/timer-stop.png")}
          iconStyles={{ width: 32, height: 32 }}
          onPress={stopTimer}
        />

        <TimerButton
          buttonStyle={{ marginHorizontal: 18 }}
          icon={toggleTimerIcon}
          iconStyles={toggleTimerIconStyles}
          onPress={toggleTimer}
        />

        <TimerButton
          buttonStyle={finishButtonStyles}
          enabled={timerDuration > 0}
          icon={require("@/assets/images/timer-finish.png")}
          iconStyles={{ width: 39, height: 34 }}
          onPress={onTimerFinished}
        />
      </View>
    </>
  );
};

export default Timer;
