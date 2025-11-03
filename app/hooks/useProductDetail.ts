import { useState, useEffect } from "react";

export interface Product {
  id: string;
  userId: string;
  description: string;
  type: string;
  amount: number;
  quantity: number;
  postedAt: number;
  status: string;
  img: string;
  unit: string;
}

const useProductDetail = (id: string) => {
  const [detail, setDetail] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "GET",
        });
        if (!response.ok) {
          const errorMsg = `API Error: ${response.status} ${response.statusText}.`;
          console.error(errorMsg);
          // If the original error was a 404, the API route does not exist or is incorrect.
          throw new Error(errorMsg);
        }

        const data = await response.json();
        setDetail(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unknown fetch error occurred.";
        console.error("Fetch operation error:", errorMessage, err);
        setError(errorMessage);
        setDetail(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id]);
  return { detail, isLoading, error };
};

export default useProductDetail;
