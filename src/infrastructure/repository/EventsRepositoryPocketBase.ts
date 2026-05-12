import User from "../../domain/core/User";
import IEventsRepository from "../../domain/repository/IEventsRepository";
import {pb} from "../pocketbaseClient";
import {Event} from "../../domain/core/Event";
import {toAddress, toTags} from "./Mapper";
import {injectable} from "inversify";

const collectionName = "events";
@injectable()
export default class EventsRepositoryPocketBase extends IEventsRepository {
    async findAvailableEvents(date: Date): Promise<Event[]> {
        try {
            const [records, reservations] = await Promise.all([
                pb.collection(collectionName).getFullList({
                    filter: `startAt >= "${date.toISOString()}"`,
                    expand: "tags,members,locations",
                }),
                pb.collection("reservations").getFullList()
            ]);

            const reservationCount: Record<string, number> = {};

            for (const r of reservations) {
                const eventId = Array.isArray(r.events) ? r.events[0] : r.events;

                if (!eventId) continue;

                const qty = Number(r.quantity ?? 1);

                reservationCount[eventId] =
                    (reservationCount[eventId] || 0) + qty;
            }

            const available = records.filter(event => {
                const count = reservationCount[event.id] || 0;
                return count < Number(event.size);
            });

            return available.map((r) => {
                return new Event(
                    r.id,
                    r.title,
                    r.description,
                    r.size,
                    new Date(r.startAt),
                    new Date(r.endAt),
                    pb.files.getURL(r, r.image),
                    toTags(r.expand?.tags ?? []),
                    r.ownerId,
                    r.price,
                    toAddress(r.expand?.locations)
                );
            });
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer les événements");
        }
    }

    async findEventById(id: string): Promise<Event | null> {
        try {
            const record = await pb.collection(collectionName).getOne(id, {
                expand: "tags,members,locations",
            });

            return new Event(
                record.id,
                record.title,
                record.description,
                record.size,
                new Date(record.startAt),
                new Date(record.endAt),
                pb.files.getURL(record, record.image),
                toTags(record.expand?.tags ?? []),
                record.ownerId,
                record.price,
                toAddress(record.expand?.locations)
            );

        } catch (error) {
            console.error(error);
            return null;
        }
    }


    saveEvent(user: User, event: Event): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

