import { addDoc, collection } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { auth, functions, db } from "./firebaseConfig";
import {
  StatsSummaryData,
  StatsSelectorValue,
  BarChartData,
  PieChartData,
} from "@/common/stats";
import { getActivityColor } from "@/common/activities";

export const logActivity = async (
  activity: string,
  durationInSeconds: number
) => {
  if (!auth.currentUser) return;
  const end = new Date();
  const start = new Date(end.getTime() - durationInSeconds * 1000);

  try {
    await addDoc(collection(db, "activities"), {
      userId: auth.currentUser.uid,
      category: activity,
      startTime: start,
      endTime: end,
      durationInSeconds: durationInSeconds,
    });
  } catch (e) {
    console.error("Error logging activity:", e);
  }
};

export const getWeeklySummary = async () => {
  const fn = httpsCallable(functions, "getWeeklySummary");
  const result = await fn();
  return result.data as StatsSummaryData;
};

export const getTimePerDay = async (range: StatsSelectorValue) => {
  const fn = httpsCallable(functions, "getTimePerDay");
  const result = await fn({ range });
  return result.data as BarChartData[];
};

export const getTimeByCategory = async (range: StatsSelectorValue) => {
  const fn = httpsCallable(functions, "getTimeByCategory");
  const result = await fn({ range });

  const data = result.data as { label: string; value: number }[];

  return data.map((item) => ({
    ...item,
    color: getActivityColor(item.label),
  })) as PieChartData[];
};
