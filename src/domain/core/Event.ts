import {Tag} from "./Tag";
import { Address } from "./Address";
export class Event {
    readonly #title: string;
    readonly #id: string;
    readonly #description: string;
    readonly #size: number;
    readonly #startAt: Date;
    readonly #endAt: Date;
    readonly #image: string;
    readonly #tags: Tag[];
    readonly #owner: string;
    readonly #address: Address;

    constructor(id: string, title: string, description: string, size: number, startAt: Date, endAt: Date, image: string, tags: Tag[] = [], owner: string, address: Address) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#size = size;
        this.#startAt = startAt;
        this.#endAt = endAt;
        this.#image = image;
        this.#tags = tags;
        this.#owner = owner;
        this.#address = address;
    }

    get id(): string {
        return this.#id;
    }

    get title(): string {
        return this.#title;
    }

    get description(): string {
        return this.#description;
    }

    get size(): number {
        return this.#size;
    }

    get startAt(): Date {
        return this.#startAt;
    }

    get endAt(): Date {
        return this.#endAt;
    }

    get image(): string {
        return this.#image;
    }

    get tags(): Tag[] {
        return this.#tags;
    }

    get owner(): string {
        return this.#owner;
    }

    get address(): Address {
        return this.#address;
    }
}