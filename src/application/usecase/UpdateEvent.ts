import {inject, injectable} from "inversify";
import IEventsRepository from "../../domain/repository/IEventsRepository";
import {Event} from "../../domain/core/Event";

@injectable()
export default class UpdateEvent {
    constructor(
        @inject(IEventsRepository)
        private repo: IEventsRepository
    ) {
    }

    async execute(eventId: string, event: Event): Promise<boolean> {
        return await this.repo.updateEvent(eventId, event);
    }
}