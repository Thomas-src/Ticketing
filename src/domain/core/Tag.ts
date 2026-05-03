export class Tag {
    #name: string;
    #slug: string;

    constructor(name: string, slug: string) {
        this.#name = name;
        this.#slug = slug;
    }

    get name(): string {
        return this.#name;
    }

    get slug(): string {
        return this.#slug;
    }

}