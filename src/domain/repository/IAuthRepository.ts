import User from "../core/User";

export default abstract class IAuthRepository {
    abstract login(email: string, password: string): Promise<User>;

    abstract logout(): Promise<void>;

    abstract getCurrentUser(): User | null;

    abstract isAuthenticated(): boolean;
}