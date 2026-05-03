export class Address {
    #name: string;
    #address: string;
    #city: string;

    constructor(name: string, address: string, city: string) {
        this.#name = name;
        this.#address = address;
        this.#city = city;
    }

    get name(): string {
        return this.#name;
    }

    get address(): string {
        return this.#address;
    }

    get city(): string {
        return this.#city;
    }

}