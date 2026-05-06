import {Event} from "../core/Event";

export interface IEventRepository {
    getEventDetails(id: number): Promise<Event>;
}