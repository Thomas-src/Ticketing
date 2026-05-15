import IReservationRepository from "../../domain/repository/IReservationRepository";
import {injectable} from "inversify";
import {pb} from "../pocketbaseClient";


const collectionName = "reservations";
@injectable()
export default class ReservationRepositoryPocketBase extends IReservationRepository {
    updateEvent(id: string, event: Event): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async verifyTicket(eventId: string, token: string): Promise<boolean> {
        try {
            await pb
                .collection(collectionName)
                .getFirstListItem(
                    `token = "${token}" && events ~ "${eventId}"`
                );
            return true;
        } catch {
            return false;
        }
    }
}