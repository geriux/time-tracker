import { auth } from "./firebaseConfig";
import { addActivityLog, UUIDString } from "@time-tracker/activities";
import dayjs from "dayjs";

export const logActivity = async (
  activityId: UUIDString,
  durationInSeconds: number
) => {
  if (!auth.currentUser) return;
  const end = dayjs();
  const start = end.subtract(durationInSeconds, "seconds");

  try {
    await addActivityLog({
      activityId,
      startTime: start.format(),
      endTime: end.format(),
      duration: durationInSeconds,
    });
  } catch (e) {
    console.error("Error logging activity:", e);
  }
};
