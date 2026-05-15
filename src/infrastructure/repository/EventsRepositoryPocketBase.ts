import IEventsRepository from "../../domain/repository/IEventsRepository";
import {pb} from "../pocketbaseClient";
import {Event} from "../../domain/core/Event";
import {mapEvent} from "./Mapper";
import {injectable} from "inversify";
import {Address} from "../../domain/core/Address";
import {Tag} from "../../domain/core/Tag";
import {Platform} from "react-native";

const collectionName = "events";
@injectable()
export default class EventsRepositoryPocketBase extends IEventsRepository {
    updateEvent(id: string, event: Event): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async findOwnerEvents(): Promise<Event[]> {
        const authUserId = pb.authStore.record?.id;

        if (!authUserId) {
            throw new Error("Utilisateur non connecté");
        }
        const record = await pb.collection(collectionName).getFullList({
            filter: `ownerId = "${authUserId}"`,
            expand: "tags,members,locations",
        })

        return record.map((r) => mapEvent(r));

    }

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

            return available.map((r) => mapEvent(r));
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

            return mapEvent(record);

        } catch (error) {
            console.error(error);
            return null;
        }
    }


    async saveEvent(event: Event): Promise<Event> {
        const authUserId = pb.authStore.record?.id;

        if (!authUserId) {
            throw new Error("Utilisateur non connecté");
        }
        try {
            const tagIds = await this.resolveTags(event.tags);
            const locationId = await this.resolveLocation(event.address);

            const data = new FormData();

            data.append("title", event.title);
            data.append("description", event.description);
            data.append("size", String(event.size));
            data.append("startAt", event.startAt.toISOString());
            data.append("endAt", event.endAt.toISOString());
            data.append("price", String(event.price));
            data.append("ownerId", authUserId);
            data.append("locations", locationId);

            tagIds.forEach(tagId => {
                data.append("tags", tagId);
            });

            if (event.image) {
                if (Platform.OS === "web") {
                    const req = await fetch(event.image);
                    const blob = await req.blob();

                    data.append("image", blob);
                } else {
                    data.append("image", {
                        uri: event.image,
                        type: "image/jpeg",
                        name: event.image.split("/").pop() || "image.jpg",
                    } as any);
                }
            }

            const createdEvent = await pb.collection("events").create(data);

            const result = await this.findEventById(createdEvent.id);

            if (result == null) {
                throw new Error("Event not found");
            }
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private async resolveTags(tags: Tag[]) {
        return Promise.all(
            tags.map(async (tag) => {
                try {
                    const existing = await pb
                        .collection("tags")
                        .getFirstListItem(`name="${tag.name}"`);

                    return existing.id;
                } catch {
                    const created = await pb
                        .collection("tags")
                        .create(tag);

                    return created.id;
                }
            })
        );
    }

    private async resolveLocation(address: Address) {
        try {
            const existing = await pb
                .collection("locations")
                .getFirstListItem(
                    `name="${address.name}"`
                );

            return existing.id;
        } catch {
            const created = await pb
                .collection("locations")
                .create({
                    name: address.name,
                    address: address.address,
                    city: address.city,
                });

            return created.id;
        }
    }
}

