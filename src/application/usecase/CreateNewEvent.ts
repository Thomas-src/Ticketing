import {inject, injectable} from "inversify";
import IEventsRepository from "../../domain/repository/IEventsRepository";
import {Event} from "../../domain/core/Event";

@injectable()
export default class CreateNewEvent {
    constructor(
        @inject(IEventsRepository)
        private repo: IEventsRepository
    ) {
    }

    async execute(event: Event): Promise<Event> {
        return await this.repo.saveEvent(event);
    }
}