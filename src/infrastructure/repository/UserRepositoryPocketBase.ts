import User from "../../domain/core/User";
import IUserRepository from "../../domain/repository/IUserRepository";
import {pb} from "../pocketbaseClient";
import {PocketBaseClientError} from "../PocketTypes";
import {injectable} from "inversify";
import {Role} from "../../domain/core/Role";
import {sanitize} from "../utils";

const collectionName = "members";
@injectable()
export default class UserRepositoryPocketBase extends IUserRepository {
    async updateRole(role: Role): Promise<void> {
        const authUserId = pb.authStore.record?.id;
        if (!authUserId) {
            throw new Error("Utilisateur non connecté");
        }
        const clean = sanitize({role});
        try {
            await pb.collection("members").update(authUserId, {
                role: clean.role,
            });
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de mettre à jour le rôle");
        }
    }

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
            console.log("Saved user :" + user.email);
        } catch (error: any) {
            const pbError = error as PocketBaseClientError;
            if (pbError.response?.status === 400) {
                throw new Error("L'adresse email est déjà utilisée");
            } else {
                throw new Error("Impossible de créer l'utilisateur");
            }

        }
    }
}