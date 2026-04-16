import IAuthRepository from "../../domain/repository/IAuthRepository";

export default class LoginUser {
    constructor(private repo: IAuthRepository) {
    }

    async execute(email: string, password: string) {
        return await this.repo.login(email, password);
    }
}