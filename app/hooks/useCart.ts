import { useEffect, useState } from "react";
import useUserSession from "./useUserSession";
import useStoreQuery from "../components/store";

interface Cart {
  id: string;
  userId: string;
  postId: string;
}

const useCart = () => {
  const [cart, setCart] = useState<Cart[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useStoreQuery((s)=> s.userId)
  console.log(userId)
  const user = useUserSession();
  console.log(user?.id);
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      setError(null);
      

      try {
        const response = await fetch(`../api/cart/${user?.id}`, {
          method: "GET",
        });
        if (!response.ok) {
          const errorData = await response.text();
          console.error("API Error Response HTML:", errorData);
        }

        const data = await response.json();
        setCart(data);
      } catch (err) {
        console.error("Fetch operation error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);
  return { cart, isLoading, error };
};

export default useCart;
