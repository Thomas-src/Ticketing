import {inject, injectable} from "inversify";
import IEventsRepository from "../../domain/repository/IEventsRepository";
import {Event} from "../../domain/core/Event";
import IUserRepository from "../../domain/repository/IUserRepository";

@injectable()
export default class CreateNewEvent {
    constructor(
        @inject(IEventsRepository)
        private repo: IEventsRepository,
        @inject(IUserRepository)
        private userRepo: IUserRepository
    ) {
    }

    async execute(event: Event): Promise<Event> {
        await this.userRepo.updateRole("admin");
        return await this.repo.saveEvent(event);
    }
}