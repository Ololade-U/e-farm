import Error from "next/error";
import useStoreQuery from "../components/store";


import { useState, useEffect } from 'react';

const usePosts = () => { 
    const userId = useStoreQuery((s) => s.userId); 
    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            return; 
        }

        const fetchPosts = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`../api/posts/${userId}`, {
                    method: "GET",
                });
                
                // Handle non-200 responses
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data); // Update state with the fetched data
                
            } catch (err) {
                // Catch network errors or errors thrown above
                console.error("Fetch operation error:", err);
            } finally {
                setIsLoading(false); // Stop loading regardless of success/fail
            }
        };

        fetchPosts();
        
    }, [userId]); // Dependency array: Re-run effect when userId changes

    // The hook returns the current state values
    return { posts, isLoading, error };
}

export default usePosts;
