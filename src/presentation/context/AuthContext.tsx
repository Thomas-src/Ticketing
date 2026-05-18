import {createContext, useContext, useEffect, useMemo, useState} from "react";
import AuthRepositoryPocketBase from "../../infrastructure/repository/AuthRepositoryPocketBase";
import User from "../../domain/core/User";
import {pb} from "../../infrastructure/pocketbaseClient";

const authRepo = new AuthRepositoryPocketBase();

const AuthContext = createContext<any>(null);

export function AuthProvider({children}: any) {
    const [user, setUser] = useState<User | null>(authRepo.getCurrentUser());

    useEffect(() => {
        const unsub = pb.authStore.onChange(() => {
            setUser(authRepo.getCurrentUser());
        });
        return () => unsub();
    }, []);

    const value = useMemo(() => ({user}), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);