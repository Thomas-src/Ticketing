import {Event} from "../core/Event";
import User from "../core/User";

export interface IEventRepository {
    findEventById(id: string): Promise<Event | null>;
}