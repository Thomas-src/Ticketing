import {Reservation} from "../core/Reservation";

export default abstract class IReservationRepository {
    abstract verifyTicket(eventId: string, token: string): Promise<Reservation | null>;

    abstract getReservationsForEvent(eventId: string): Promise<Reservation[]>;
    abstract saveReservation(reservation: Reservation): Promise<void>

    abstract getUserTickets(): Promise<Reservation[] | null>;
}