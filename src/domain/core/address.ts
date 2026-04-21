export class Address {
    name: string;
    street: string;
    city: string;
    postalCode: number;
    number: number;

    constructor(name: string, street: string, city: string, postalCode: number, number: number) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.number = number;
    }
}