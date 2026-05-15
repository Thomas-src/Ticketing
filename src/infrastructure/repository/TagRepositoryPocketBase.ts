import {pb} from "../pocketbaseClient";
import {injectable} from "inversify";
import {Tag} from "../../domain/core/Tag";
import ITagRepository from "../../domain/repository/ITagRepository";

const collectionName = "tags";
@injectable()
export default class TagRepositoryPocketBase extends ITagRepository {
    async getAllTags(): Promise<Tag[] | null> {
        try {
            const records = await pb.collection(collectionName).getFullList();

            return records.map((record) =>
                new Tag(record.name)
            );

        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

