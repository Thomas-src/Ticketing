import User from "./User";
import {Event} from "./Event";

export class Reservation {
    readonly #owner: User;
    readonly #quantity: number;
    readonly #event: Event;
    readonly #guests: string[];
    readonly #token: string;
    readonly #scanned: boolean;


    constructor(owner: User, quantity: number, event: Event, guests: string[], token: string, scanned: boolean) {
        this.#owner = owner;
        this.#quantity = quantity;
        this.#event = event;
        this.#guests = guests;
        this.#token = token;
        this.#scanned = scanned;
    }

    get scanned(): boolean {
        return this.#scanned;
    }

    get owner(): User {
        return this.#owner;
    }

    get quantity(): number {
        return this.#quantity;
    }

    get token(): string {
        return this.#token;
    }

    get guests(): string[] {
        return this.#guests;
    }

    get event(): Event {
        return this.#event;
    }
}

