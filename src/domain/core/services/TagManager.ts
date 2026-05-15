import {inject, injectable} from "inversify";
import ITagRepository from "../../repository/ITagRepository";
import {Tag} from "../Tag";

@injectable()
export class TagManager {
    constructor(
        @inject(ITagRepository)
        private repo: ITagRepository
    ) {
    }

    async getAllTags(): Promise<Tag[] | null> {
        return await this.repo.getAllTags();
    }
}