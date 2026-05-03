import User from "../core/User";
import {Event} from "../core/Event";

export default interface IEventsRepository {
    findAvailableEvents(date: Date): Promise<Event[]>;

    saveEvent(user: User, event: Event): Promise<boolean>;
}