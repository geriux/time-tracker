import { ImageSourcePropType } from "react-native";

export interface Activity {
  id: number;
  name: string;
  icon: ImageSourcePropType;
}

export const ACTIVITIES: Activity[] = [
  { id: 1, name: "Work", icon: require("@/assets/images/work.png") },
  { id: 3, name: "Excercise", icon: require("@/assets/images/excercise.png") },
  { id: 2, name: "Meals", icon: require("@/assets/images/meals.png") },
  {
    id: 4,
    name: "Meditation",
    icon: require("@/assets/images/meditation.png"),
  },
  { id: 5, name: "Study", icon: require("@/assets/images/study.png") },
  { id: 6, name: "Sleep", icon: require("@/assets/images/sleep.png") },
  {
    id: 7,
    name: "Entertainment",
    icon: require("@/assets/images/entertainment.png"),
  },
  {
    id: 8,
    name: "Socializing",
    icon: require("@/assets/images/socializing.png"),
  },
  {
    id: 9,
    name: "Creative Time",
    icon: require("@/assets/images/creative.png"),
  },
  {
    id: 10,
    name: "Screen Time",
    icon: require("@/assets/images/screen-time.png"),
  },
];
