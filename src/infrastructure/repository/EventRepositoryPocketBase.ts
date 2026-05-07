import {IEventRepository} from "../../domain/repository/IEventRepository";
import {Event} from "../../domain/core/Event";
import {Tag} from "../../domain/core/Tag";
import {Address} from "../../domain/core/Address";
import {pb} from "../pocketbaseClient";
import {toAddress, toTags} from "./Mapper";

const collectionName = "events";
export default class EventRepositoryPocketBase implements IEventRepository {

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
                toAddress(record.expand?.locations)
            );

        } catch (error) {
            console.error(error);
            return null;
        }
    }

}