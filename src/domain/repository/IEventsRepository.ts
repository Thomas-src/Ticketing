import {Event} from "../core/Event";

export default abstract class IEventsRepository {
    abstract findAvailableEvents(date: Date): Promise<Event[]>;

    abstract saveEvent(event: Event): Promise<Event>;

    abstract findEventById(id: string): Promise<Event | null>

    abstract findOwnerEvents(): Promise<Event[]>;

    abstract updateEvent(id: string, event: Event): Promise<boolean>;
}