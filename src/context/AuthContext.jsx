import { createContext, useState} from "react";

export const AuthContext=createContext();

export function AuthContextProvider({children}) {
    const [user, setUser] = useState(null);

    const login = (username) => {
      setUser({ username });
    };
  
    const logout = () => {
      setUser(null);
    };

    const context = {
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={context}> {children}</AuthContext.Provider>
    )
}