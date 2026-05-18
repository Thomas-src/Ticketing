import IReservationRepository from "../../domain/repository/IReservationRepository";
import {injectable} from "inversify";
import {pb} from "../pocketbaseClient";
import {toReservation} from "./Mapper";
import {Reservation} from "../../domain/core/Reservation";
import {sanitize} from "../utils";

const collectionName = "reservations";
@injectable()
export default class ReservationRepositoryPocketBase extends IReservationRepository {
    async getUserTickets(): Promise<Reservation[] | null> {
        const authUserId = pb.authStore.record?.id;
        if (!authUserId) return null;

        try {
            const reservations = await pb
                .collection(collectionName)
                .getFullList({
                    filter: `members = "${authUserId}"`,
                    expand: 'members,events,events.locations,events.tags'
                });

            return reservations.map(r => toReservation(r));
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async verifyTicket(eventId: string, token: string): Promise<Reservation | null> {
        const clean = sanitize({eventId, token})
        try {
            const reservation = await pb
                .collection(collectionName)
                .getFirstListItem(
                    `token = "${clean.token}" && events = "${clean.eventId}"`,
                    {expand: 'members,events,events.locations,events.tags'}
                );
            const alreadyScanned = reservation.scanned;
            if (!reservation.scanned) {
                try {
                    await pb.collection(collectionName).update(reservation.id, {scanned: true});
                } catch (updateErr) {
                    console.warn("Could not update the ticket — permission issue?", updateErr);
                }
            }

            return toReservation({...reservation, scanned: alreadyScanned});
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getReservationsForEvent(eventId: string): Promise<Reservation[]> {
        const clean = sanitize({eventId});

        try {
            const reservations = await pb
                .collection(collectionName)
                .getFullList({
                    filter: `events ~ "${clean.eventId}"`,
                    expand: 'members,events,events.locations,events.tags'
                });

            return reservations.map(r => toReservation(r));
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async saveReservation(reservation: Reservation): Promise<void> {
        const authUserId = pb.authStore.record?.id;
        const clean = sanitize({reservation});
        if (!authUserId) {
            throw new Error("Utilisateur non connecté");
        }

        try {
            const data = new FormData();

            data.append("members", authUserId);
            data.append("quantity", String(reservation.quantity));
            data.append("events", reservation.event.id);
            data.append("guests", JSON.stringify(reservation.guests));
            data.append("token", reservation.token);
            data.append("scanned", "false");

        } catch (error) {
            console.error(error);
            throw error;
        }



    }
}