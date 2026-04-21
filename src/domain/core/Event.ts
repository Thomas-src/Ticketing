import {Tag} from "./Tag";
import {Address} from "./address";

export class Event {
    id: number;
    name: string;
    description: string;
    tags: Tag[];
    seatsLeft: number;

    beginDate: Date;
    endDate: Date;

    adress: Address;

    constructor(id: number, name: string, description: string, tags: Tag[], seatsLeft: number, beginDate: Date, endDate: Date, adress: Address ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.seatsLeft = seatsLeft;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.adress = adress;
    }

}