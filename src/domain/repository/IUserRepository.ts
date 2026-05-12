import User from "../core/User";

export default abstract class IUserRepository {
    abstract saveUser(user: User, password: string): Promise<void>;
}