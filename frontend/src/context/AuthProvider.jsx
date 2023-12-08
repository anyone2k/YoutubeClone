import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  

    useEffect(() => {
        if (localStorage.getItem('token') !== '') {
                setIsLoggedIn(true);
        } else {
                setIsLoggedIn(false);
        }
        
        // Nettoyer en enlevant la classe lorsque le composant est démonté
        return () => {
            setLogin();
            console.log("destroyed");
        };

        // Tableau de Dépendance : s'exécute uniquement lorsque darkMode change
    }, []);
    function setLogin() {
            setIsLoggedIn(!isLoggedIn);

    }

    return (
        <AuthContext.Provider value={{ setLogin, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
