import { useEffect, useState } from "react";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const localStorage = window.localStorage.getItem('auth-token');
        setIsLoggedIn(localStorage)
    });
    return { isLoggedIn }
}

export default useAuth