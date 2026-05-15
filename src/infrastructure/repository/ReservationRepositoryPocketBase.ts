import IReservationRepository from "../../domain/repository/IReservationRepository";
import {injectable} from "inversify";
import {pb} from "../pocketbaseClient";

const collectionName = "reservations";
@injectable()
export default class ReservationRepositoryPocketBase extends IReservationRepository {

    async verifyTicket(eventId: string, token: string): Promise<boolean> {
        try {
            const reservation = await pb
                .collection(collectionName)
                .getFirstListItem(`token = "${token}" && events ~ "${eventId}"`);

            if (!reservation.scanned) {
                await pb.collection(collectionName).update(reservation.id, {scanned: true});
            }
            return !reservation.scanned;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}