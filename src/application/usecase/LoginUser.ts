import IAuthRepository from "../../domain/repository/IAuthRepository";
import User from "../../domain/core/User";
import {inject, injectable} from "inversify";

@injectable()
export default class LoginUser {
    constructor(
        @inject(IAuthRepository)
        private repo: IAuthRepository
    ) {
    }

    async execute(email: string, password: string): Promise<User> {
        return await this.repo.login(email, password);
    }
}