import Error from "next/error";
import useStoreQuery from "../components/store";


import { useState, useEffect } from 'react';

export interface Products{
    id : string,
    userId : string,
    description : string,
    type : string,
    amount : number,
    quantity : number,
    postedAt : number,
    status : string,
    img : string
}

const usePost = () => { 
    const userId = useStoreQuery((s) => s.userId); 
    const [posts, setPosts] = useState<Products[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const postId = useStoreQuery((s)=> s.postId)

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
                console.log(response)
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
        
    }, [userId, postId]); // Dependency array: Re-run effect when userId changes

    // The hook returns the current state values
    return { posts, isLoading, error };
}

export default usePost;
