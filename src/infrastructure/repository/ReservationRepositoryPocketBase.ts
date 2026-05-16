import IReservationRepository from "../../domain/repository/IReservationRepository";
import {injectable} from "inversify";
import {pb} from "../pocketbaseClient";
import {toReservation} from "./Mapper";
import {Reservation} from "../../domain/core/Reservation";
import {sanitize} from "../utils";

const collectionName = "reservations";
@injectable()
export default class ReservationRepositoryPocketBase extends IReservationRepository {
    async verifyTicket(eventId: string, token: string): Promise<Reservation | null> {
        const clean = sanitize({eventId, token})
        try {
            const reservation = await pb
                .collection(collectionName)
                .getFirstListItem(
                    `token = "${clean.token}" && events ~ "${clean.eventId}"`,
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