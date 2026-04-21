import User from "../core/User";

export default interface IAuthRepository {
    login(email: string, password: string): Promise<User>;

    logout(): Promise<void>;

    getCurrentUser(): User | null;

    isAuthenticated(): boolean;
}