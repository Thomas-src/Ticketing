import {Event} from "../../domain/core/Event";
import IEventsRepository from "../../domain/repository/IEventsRepository";
import {inject, injectable} from "inversify";

@injectable()
export default class GetAvaiblesEvents {
    constructor(
        @inject(IEventsRepository)
        private repo: IEventsRepository
    ) {
    }

    async execute(date: Date): Promise<Event[]> {
        return await this.repo.findAvailableEvents(date);
    }
}