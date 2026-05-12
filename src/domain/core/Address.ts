export class Address {
    #name: string;
    #address: string;
    #city: string;
    #street: string;
    #postalCode: number;

    constructor(name: string, address: string, city: string, street: string, postalCode: number) {
        this.#name = name;
        this.#address = address;
        this.#street = street;
        this.#city = city;
        this.#postalCode = postalCode
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

    get street(): string {
        return this.#street;
    }

    get postalCode(): number {
        return this.#postalCode;
    }


}