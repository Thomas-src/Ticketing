import {Tag} from "./Tag";

export interface Event {
    id: number;
    name: string;
    description: string;
    tags: Tag[];
    seats: number;

    beginDate: Date;
    endDate: Date;

    placeName: string;
    street: string;
    city: string;
    postalCode: number;

}