import * as admin from "firebase-admin";
import { onCall } from "firebase-functions/v2/https";

admin.initializeApp();
const db = admin.firestore();

type Activity = {
  userId: string;
  category: string;
  durationInSeconds: number;
  startTime: admin.firestore.Timestamp;
};

export const getWeeklySummary = onCall(async (req) => {
  const userId = req.auth?.uid;
  const now = admin.firestore.Timestamp.now();
  const jsDate = now.toDate();
  const jsDay = jsDate.getDay();
  const start = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() - jsDay * 24 * 60 * 60 * 1000)
  );

  const snapshot = await db
    .collection("activities")
    .where("userId", "==", userId)
    .where("startTime", ">=", start)
    .where("endTime", "<=", now)
    .orderBy("startTime", "asc")
    .get();

  let totalSeconds = 0;
  const categoryCount: Record<string, number> = {};
  let longestSession: { duration: number; category: string } = {
    duration: 0,
    category: "",
  };

  snapshot.forEach((doc) => {
    const data = doc.data() as Activity;
    totalSeconds += data.durationInSeconds;

    categoryCount[data.category] = (categoryCount[data.category] || 0) + 1;

    if (data.durationInSeconds > longestSession.duration) {
      longestSession = {
        duration: data.durationInSeconds,
        category: data.category,
      };
    }
  });

  const mostFrequent =
    Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  return {
    totalTime: totalSeconds,
    mostFrequent,
    longestSession,
  };
});

export const getTimePerDay = onCall(async (req) => {
  const userId = req.auth?.uid;
  const { range } = req.data;
  const now = admin.firestore.Timestamp.now();
  const jsDate = now.toDate();
  const jsDay = jsDate.getDay();
  const days = range === "month" ? 30 : jsDay;

  const start = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  );

  const snapshot = await db
    .collection("activities")
    .where("userId", "==", userId)
    .where("startTime", ">=", start)
    .where("endTime", "<=", now)
    .orderBy("startTime", "asc")
    .get();

  const weekdayTotals: Record<number, number> = Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => [i + 1, 0])
  );

  snapshot.forEach((doc) => {
    const data = doc.data() as Activity;
    const startTimeDate = data.startTime.toDate();
    const jsDay = startTimeDate.getDay();
    const weekday = jsDay === 0 ? 7 : jsDay;
    weekdayTotals[weekday] += data.durationInSeconds;
  });

  return Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    value: weekdayTotals[i + 1],
  }));
});

export const getTimeByCategory = onCall(async (req) => {
  const userId = req.auth?.uid;
  const { range } = req.data;
  const now = admin.firestore.Timestamp.now();
  const jsDate = now.toDate();
  const jsDay = jsDate.getDay();
  const days = range === "month" ? 30 : jsDay;

  const start = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  );

  const snapshot = await db
    .collection("activities")
    .where("userId", "==", userId)
    .where("startTime", ">=", start)
    .where("startTime", "<=", now)
    .get();

  const categoryTotals: Record<string, number> = {};

  snapshot.forEach((doc) => {
    const data = doc.data() as Activity;
    categoryTotals[data.category] =
      (categoryTotals[data.category] || 0) + data.durationInSeconds;
  });

  const result = Object.entries(categoryTotals).map(([label, value]) => ({
    label,
    value,
  }));

  return result;
});
