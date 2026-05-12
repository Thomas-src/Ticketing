import {Event} from "../core/Event";

export default abstract class IEventsRepository {
    abstract findAvailableEvents(date: Date): Promise<Event[]>;

    abstract saveEvent(event: Event): Promise<boolean>;

    abstract findEventById(id: string): Promise<Event | null>
}