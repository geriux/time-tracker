import * as FileSystem from "expo-file-system";
import { Skia } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";

export default function useLocalSVG(path: string | null) {
  const [svg, setSvg] = useState<ReturnType<
    typeof Skia.SVG.MakeFromString
  > | null>(null);

  useEffect(() => {
    if (!path) return;

    if (path.startsWith("http")) {
      setSvg(null);
      return;
    }

    FileSystem.readAsStringAsync(path)
      .then((svgString) => {
        const parsed = Skia.SVG.MakeFromString(svgString);
        if (!parsed) {
          console.warn("Invalid SVG string");
        }
        setSvg(parsed ?? null);
      })
      .catch((error) => {
        console.warn("Failed to read local SVG:", error);
        setSvg(null);
      });
  }, [path]);

  return svg;
}
