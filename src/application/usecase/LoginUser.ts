import IAuthRepository from "../../domain/repository/IAuthRepository";
import User from "../../domain/core/User";

export default class LoginUser {
    constructor(private repo: IAuthRepository) {
    }

    async execute(email: string, password: string): Promise<User> {
        return await this.repo.login(email, password);
    }
}