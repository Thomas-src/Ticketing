import User from "../core/User";

export default interface IUserRepository {
    saveUser(user: User, password: string): Promise<void>;
}