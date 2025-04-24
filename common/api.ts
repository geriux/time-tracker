import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const logActivity = async (
  activity: string,
  durationInSeconds: number
) => {
  if (!auth.currentUser) return;
  const start = new Date();
  const end = new Date(start.getTime() + durationInSeconds * 1000);

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
