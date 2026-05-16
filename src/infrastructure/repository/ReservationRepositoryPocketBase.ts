import IReservationRepository from "../../domain/repository/IReservationRepository";
import {injectable} from "inversify";
import {pb} from "../pocketbaseClient";
import {toReservation} from "./Mapper";
import {Reservation} from "../../domain/core/Reservation";

const collectionName = "reservations";
@injectable()
export default class ReservationRepositoryPocketBase extends IReservationRepository {
    async verifyTicket(eventId: string, token: string): Promise<Reservation | null> {
        try {
            const reservation = await pb
                .collection(collectionName)
                .getFirstListItem(
                    `token = "${token}" && events ~ "${eventId}"`,
                    {expand: 'members,events,events.locations,events.tags'}
                );
            const alreadyScanned = reservation.scanned;
            if (!reservation.scanned) {
                await pb.collection(collectionName).update(reservation.id, {scanned: true});
            }

            return toReservation({...reservation, scanned: alreadyScanned});
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}