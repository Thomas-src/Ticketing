import IEventsRepository from "../../domain/repository/IEventsRepository";
import {inject} from "inversify";


export default class DisplayEventDetails {
    constructor(
        @inject(IEventsRepository)
        private repo: IEventsRepository
    ) {
    }

    async execute(id: string) {
        return this.repo.findEventById(id);
    }
}