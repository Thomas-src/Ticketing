import User from "../core/User";
import {Role} from "../core/Role";

export default abstract class IUserRepository {
    abstract saveUser(user: User, password: string): Promise<void>;

    abstract updateRole(role: Role): Promise<void>;
}