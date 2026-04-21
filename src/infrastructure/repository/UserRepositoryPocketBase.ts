import User from "../../domain/core/User";
import IUserRepository from "../../domain/repository/IUserRepository";
import {pb} from "../pocketbaseClient";

const collectionName = "members";

export default class UserRepositoryPocketBase implements IUserRepository {

    async saveUser(user: User, password: string): Promise<void> {
        try {
            await pb.collection(collectionName).create({
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: password,
                passwordConfirm: password,
                role: user.role,
            });

            await pb.collection(collectionName).authWithPassword(user.email, password);
        } catch (error: any) {
            console.error(error);
            console.error("Error pocketbase:", error?.response || error);
            throw new Error("Impossible de créer l'utilisateur");
        }
    }
}