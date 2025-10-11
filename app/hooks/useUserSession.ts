
import { useEffect, useState } from 'react';
import useStoreQuery from '../components/store';
import { useSession } from "next-auth/react";


interface Props{
    id : string,
    username : string,
    email : string
}

const useUserSession = () => {
    // 1. Get the session data
    const { data: session } = useSession();
    const [user, setUser] = useState<Props | null>(null)
    
    // 2. Get the function to set the state
    const setUserId = useStoreQuery((s) => s.setUserId);

    // 3. Use useEffect to run the fetch logic only when dependencies change
    useEffect(() => {
        // Guard clause: Only proceed if the session and email are available
        if (!session?.user?.email) {
            return;
        }

        const userEmail = session.user.email;
        
        const fetchAndSetUserId = async () => {
            try {
                // 1. Fetch the user object from your API (using the user's email)
                const response = await fetch(`../api/users/${userEmail}`, {
                    method: "GET",
                });

                // 2. Handle API errors (4xx or 5xx status codes)
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("API Error:", errorData.error);
                    // Throwing an error stops execution in the try block
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // 3. Parse the JSON data
                const userObject = await response.json();
                setUser(userObject)
                // 4. Update the global store with the retrieved user ID
                setUserId(userObject.id);

            } catch (error) {
                console.error("Fetch operation error:", error);
                // Optionally: Set an error state in your global store here
            }
        };

        fetchAndSetUserId();
    
    // Dependencies: Re-run only if the email or setUserId function changes.
    // setUserId is stable, so we primarily depend on the session email.
    }, [session?.user?.email, setUserId]); 

    return user
};

export default useUserSession;