import {Event} from "../../domain/core/Event";
import IEventsRepository from "../../domain/repository/IEventsRepository";

export default class GetAvaiblesEvents {
    constructor(private repo: IEventsRepository) {
    }

    async execute(date: Date): Promise<Event[]> {
        return await this.repo.findAvailableEvents(date);
    }
}