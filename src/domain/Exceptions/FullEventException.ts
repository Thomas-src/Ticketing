export default class FullEventException extends Error {
    constructor(message: string = "Event is full") {
        super(message);

        this.name = "FullEventException";

        Object.setPrototypeOf(this, FullEventException.prototype);
    }
}