import {Tag} from "../core/Tag";

export default abstract class ITagRepository {
    abstract getAllTags(): Promise<Tag[] | null>;
}