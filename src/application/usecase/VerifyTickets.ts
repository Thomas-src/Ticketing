import {inject, injectable} from "inversify";
import IReservationRepository from "../../domain/repository/IReservationRepository";

@injectable()
export default class VerifyTickets {
    constructor(
        @inject(IReservationRepository)
        private repo: IReservationRepository
    ) {
    }

    async execute(eventId: string, token: string): Promise<boolean> {
        return await this.repo.verifyTicket(eventId, token);
    }
}