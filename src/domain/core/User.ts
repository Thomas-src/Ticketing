import {Role} from "./Role";

export default class User {
    readonly #name: string;
    readonly #surname: string;
    readonly #email: string;
    readonly #role: Role;

    constructor(name: string, surname: string, email: string, role: Role) {
        this.#name = name;
        this.#surname = surname;
        this.#email = email;
        this.#role = role;
    }

    get email(): string {
        return this.#email;
    }

    get role(): string {
        return this.#role;
    }

    get name(): string {
        return this.#name;
    }

    get surname(): string {
        return this.#surname;
    }
}