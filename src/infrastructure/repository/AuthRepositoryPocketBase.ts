import {pb} from "../pocketbaseClient";
import IAuthRepository from "../../domain/repository/IAuthRepository";
import User from "../../domain/core/User";
import {Role} from "../../domain/core/Role";

const collectionName = "members";
export default class AuthRepositoryPocketBase implements IAuthRepository {
    async login(email: string, password: string): Promise<User> {
        try {
            const authData = await pb
                .collection(collectionName)
                .authWithPassword(email, password);

            const r = authData.record;

            const role: Role = r.role;
            return new User(r.name, r.surname, r.email, role);

        } catch (error: any) {
            console.error(error);
            throw new Error("Email ou mot de passe invalide");
        }
    }

    async logout(): Promise<void> {
        pb.authStore.clear();
    }

    getCurrentUser(): User | null {
        const r = pb.authStore.record;

        if (!r) return null;

        const role: Role = r.role;
        return new User(r.name, r.surname, r.email, role);
    }

    isAuthenticated(): boolean {
        return pb.authStore.isValid;
    }
}