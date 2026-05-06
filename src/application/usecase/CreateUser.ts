import IUserRepository from "../../domain/repository/IUserRepository";
import User from "../../domain/core/User";

export default class CreateUser {
    constructor(private repo: IUserRepository) {
    }

    async execute(name: string, surname: string, email: string, password: string): Promise<User> {
        const user = new User(name, surname, email, "user");
        await this.repo.saveUser(user, password);
        return user;
    }
}