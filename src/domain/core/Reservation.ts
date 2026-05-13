import User from "./User";

export class Reservation {
    readonly #owner: User;
    readonly #quantity: number;
    readonly #event: Event;
    readonly #guests: string[];


    constructor(owner: User, quantity: number, event: Event, guests: string[]) {
        this.#owner = owner;
        this.#quantity = quantity;
        this.#event = event;
        this.#guests = guests;
    }

}

