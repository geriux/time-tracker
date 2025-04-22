import { DataSource } from "@shopify/react-native-skia";
import { ImageSourcePropType } from "react-native";

export interface Activity {
  color: string;
  icon: ImageSourcePropType;
  name: string;
  slug: string;
}

export const ACTIVITIES: Activity[] = [
  {
    color: "#6A994E",
    icon: require("@/assets/images/work.png"),
    name: "Work",
    slug: "work",
  },
  {
    color: "#A7C957",
    icon: require("@/assets/images/excercise.png"),
    name: "Excercise",
    slug: "excercise",
  },
  {
    color: "#386641",
    icon: require("@/assets/images/meals.png"),
    name: "Meals",
    slug: "meals",
  },
  {
    color: "#F4A261",
    icon: require("@/assets/images/meditation.png"),
    name: "Meditation",
    slug: "meditation",
  },
  {
    color: "#E76F51",
    icon: require("@/assets/images/study.png"),
    name: "Study",
    slug: "study",
  },
  {
    color: "#E63946",
    icon: require("@/assets/images/sleep.png"),
    name: "Sleep",
    slug: "sleep",
  },
  {
    color: "#F9844A",
    icon: require("@/assets/images/entertainment.png"),
    name: "Entertainment",
    slug: "entertainment",
  },
  {
    color: "#9B5DE5",
    icon: require("@/assets/images/socializing.png"),
    name: "Socializing",
    slug: "socializing",
  },
  {
    color: "#F15BB5",
    icon: require("@/assets/images/creative.png"),
    name: "Creative Time",
    slug: "creative-time",
  },
  {
    color: "#00BBF9",
    icon: require("@/assets/images/screen-time.png"),
    name: "Screen Time",
    slug: "screen-time",
  },
];

export function getActivityIcon(slug: string): ImageSourcePropType | undefined {
  return ACTIVITIES.find((activity) => activity.slug === slug)?.icon;
}
