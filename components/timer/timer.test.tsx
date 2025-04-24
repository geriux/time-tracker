import { act, render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import Timer from "./timer";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import * as Haptics from "expo-haptics";

jest.useFakeTimers();

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
}));

jest.mock("expo-keep-awake", () => ({
  activateKeepAwakeAsync: jest.fn(),
  deactivateKeepAwake: jest.fn(),
}));

jest.mock("dayjs", () => {
  const originalDayjs = jest.requireActual("dayjs");
  return {
    ...originalDayjs,
    duration: jest.fn(() => ({
      format: jest.fn().mockReturnValue("01:00:00"),
    })),
  };
});

describe("Timer Component", () => {
  it("should start the timer when the start button is pressed", async () => {
    const { getByLabelText, getByText } = render(
      <Timer onFinished={jest.fn()} onStopped={jest.fn()} />
    );
    const startPauseButton = getByLabelText("start-pause-button");
    fireEvent.press(startPauseButton);

    expect(activateKeepAwakeAsync).toHaveBeenCalled();

    await waitFor(() => {
      expect(getByText("01:00:00")).toBeTruthy();
    });
  });

  it("should pause the timer when the pause button is pressed", async () => {
    const onStoppedMock = jest.fn();
    const { getByLabelText } = render(
      <Timer onFinished={jest.fn()} onStopped={onStoppedMock} />
    );

    const startPauseButton = getByLabelText("start-pause-button");
    const currentTimer = getByLabelText("current-timer");
    fireEvent.press(startPauseButton);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    const initialTime = currentTimer.props.children;
    fireEvent.press(startPauseButton);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(currentTimer.props.children).toBe(initialTime);
    expect(deactivateKeepAwake).toHaveBeenCalled();
  });

  it("should call onFinished when the timer is finished and the user confirms in the alert", async () => {
    const onFinishedMock = jest.fn();
    const { getByLabelText } = render(
      <Timer onFinished={onFinishedMock} onStopped={jest.fn()} />
    );

    const alertMock = jest
      .spyOn(Alert, "alert")
      .mockImplementation((_title, _message, buttons) => {
        // Simulate the user pressing the "Yes" button
        if (buttons && buttons[1] && buttons[1].onPress) {
          buttons[1].onPress();
        }
      });

    const startPauseButton = getByLabelText("start-pause-button");
    fireEvent.press(startPauseButton);

    fireEvent.press(getByLabelText("finish-button"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Finishing timer",
        "Are you sure you want to finish the current running timer?",
        expect.any(Array)
      );
    });

    expect(onFinishedMock).toHaveBeenCalledWith(1);
    alertMock.mockRestore();
  });

  it("should call haptic feedback when the start button is pressed", () => {
    const { getByLabelText } = render(
      <Timer onFinished={jest.fn()} onStopped={jest.fn()} />
    );

    const startPauseButton = getByLabelText("start-pause-button");
    fireEvent.press(startPauseButton);

    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });
});
