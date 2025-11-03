import { useState, useEffect } from "react";

export interface Uploader {
  id: string;
  username: string;
  storeName: string;
}

const useProductUploadDetail = (userId: string) => {
  const [uploader, setUploader] = useState<Uploader | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/uploader/${userId}`, {
          method: "GET",
        });
        if (!response.ok) {
          const errorMsg = `API Error: ${response.status} ${response.statusText}.`;
          console.error(errorMsg);
          // If the original error was a 404, the API route does not exist or is incorrect.
          throw new Error(errorMsg);
        }

        const data = await response.json();
        setUploader(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unknown fetch error occurred.";
        console.error("Fetch operation error:", errorMessage, err);
        setError(errorMessage);
        setUploader(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);
  return { uploader, isLoading, error };
};

export default useProductUploadDetail;
