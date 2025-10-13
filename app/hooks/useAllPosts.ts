

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
}

const useAllPost = () => {
  const [posts, setPosts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`../api/posts`, {
          method: "GET",
        });
        if (!response.ok) {
          const errorData = await response.text();
          console.error("API Error Response HTML:", errorData);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Fetch operation error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return { posts, isLoading, error };
};

export default useAllPost;
