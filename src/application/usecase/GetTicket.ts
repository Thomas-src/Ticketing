import {inject, injectable} from "inversify";
import IReservationRepository from "../../domain/repository/IReservationRepository";
import {Reservation} from "../../domain/core/Reservation";

@injectable()
export default class GetTicket {
    constructor(
        @inject(IReservationRepository)
        private repo: IReservationRepository
    ) {}


    async execute(token: string): Promise<Reservation> {
        const reservation = await this.repo.getReservationByToken(token);

        if (!reservation) {
            throw new Error(`Reservation non trouvé pour le token : ${token}`);
        }

        return reservation;
    }
}