
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
                const response = await fetch(`../api/users/${userEmail}`, {
                    method: "GET",
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("API Error:", errorData.error);
                    // Throwing an error stops execution in the try block
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const userObject = await response.json();
                setUser(userObject)
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