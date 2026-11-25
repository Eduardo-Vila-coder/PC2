import { createContext, useState, type ReactNode } from "react";

export const AuthContext = createContext({
    token: '',
    saveToken: (_t:string) => {},
})

export function AuthProvider({children}: {children: ReactNode}) {
    const [token, setToken] = useState(localStorage.getItem("token") ?? "");
    const saveToken = (t: string) => {
        setToken(t);
        localStorage.setItem('token', t);
    }

    return <AuthContext.Provider value={{token, saveToken}}>
        {children}
    </AuthContext.Provider>
}