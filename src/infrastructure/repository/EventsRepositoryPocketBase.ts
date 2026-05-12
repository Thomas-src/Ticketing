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


    async saveEvent(event: Event): Promise<boolean> {
        try {
            const authUserId = pb.authStore.record?.id;
            if (!authUserId) {
                throw new Error("Utilisateur non connecté");
            }

            const tagIds = await Promise.all(
                event.tags.map(async (tag) => {
                    try {
                        const existing = await pb.collection("tags")
                            .getFirstListItem(`slug = "${tag.slug}"`);
                        return existing.id;
                    } catch {
                        const created = await pb.collection("tags")
                            .create({name: tag.name, slug: tag.slug});
                        return created.id;
                    }
                })
            );

            let locationId: string;
            try {
                const existing = await pb.collection("locations").getFirstListItem(`name = "${event.address.name}"`);
                locationId = existing.id;
            } catch {
                const created = await pb.collection("locations").create({
                    name: event.address.name,
                    address: event.address.address,
                    city: event.address.city,
                    street: event.address.street,
                    postalCode: event.address.postalCode,
                });
                locationId = created.id;
            }

            const data = {
                title: event.title,
                description: event.description,
                size: event.size,
                startAt: event.startAt.toISOString(),
                endAt: event.endAt.toISOString(),
                tags: tagIds,
                locations: locationId,
                price: event.price,
                ownerId: authUserId,
            };

            if (event.id) {
                await pb.collection(collectionName).update(event.id, data);
            } else {
                await pb.collection(collectionName).create(data);
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

