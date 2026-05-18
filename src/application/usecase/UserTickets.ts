import {inject, injectable} from "inversify";
import IReservationRepository from "../../domain/repository/IReservationRepository";
import {Reservation} from "../../domain/core/Reservation";

@injectable()
export default class UserTickets {
    constructor(
        @inject(IReservationRepository)
        private repo: IReservationRepository
    ) {
    }

    async execute(): Promise<Reservation[] | null> {
        return await this.repo.getUserTickets();


    }
}