export default abstract class IReservationRepository {
    abstract verifyTicket(eventId: string, token: string): Promise<boolean>;
}