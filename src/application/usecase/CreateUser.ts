import User from "../../domain/core/User";
import {inject, injectable} from "inversify";
import IUserRepository from "../../domain/repository/IUserRepository";


@injectable()
export default class CreateUser {
    constructor(
        @inject(IUserRepository)
        private repo: IUserRepository
    ) {
    }

    async execute(name: string, surname: string, email: string, password: string): Promise<User> {
        const user = new User(name, surname, email, "user");
        await this.repo.saveUser(user, password);
        return user;
    }
}