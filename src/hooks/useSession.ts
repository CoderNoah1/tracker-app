import axios from "axios";
import { useEffect, useState } from "react";

export default function useSession () {

    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get('/api/auth/session');
                    
                const session = response.data;
                setUserId(session?.user?.id || null);
            } catch (error) {
                console.error("Failed to fetch userId", error);
                setUserId(null)
            } finally {
                setIsloading(false)
            }
        }
    
        fetchUserId();
    }, []);

    return {userId, isLoading}

}