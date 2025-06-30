import { useState, useEffect, useCallback } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/common/firebaseConfig";
import { Image } from "expo-image";

export default function useRemoteImage(source: string) {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchImage = useCallback(() => {
    getDownloadURL(ref(storage, source))
      .then((imageUrl) => {
        setImage(imageUrl);
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            setError("File doesn't exist");
            break;
          case "storage/unauthorized":
            setError("User doesn't have permission to access the object");
            break;
          case "storage/unknown":
            setError("Unknown error occurred");
            break;
          default:
            setError("An unexpected error occurred");
        }
      });
  }, [source]);

  useEffect(() => {
    Image.getCachePathAsync(source)
      .then((cachedImage) => {
        if (cachedImage) {
          setImage(cachedImage);
        } else {
          fetchImage();
        }
      })
      .catch((error) => {
        console.error("Error fetching cached image:", error);
      });
  }, [source, fetchImage]);

  return { image, error };
}
