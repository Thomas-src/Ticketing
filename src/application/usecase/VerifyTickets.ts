import {inject, injectable} from "inversify";
import IReservationRepository from "../../domain/repository/IReservationRepository";
import {VerifyResult} from "../../types/ScreenType";

@injectable()
export default class VerifyTickets {
    constructor(
        @inject(IReservationRepository)
        private repo: IReservationRepository
    ) {
    }

    async execute(eventId: string, token: string): Promise<VerifyResult> {
        const reservation = await this.repo.verifyTicket(eventId, token);

        if (!reservation) return {ok: false, reason: 'not_found'};
        if (reservation.scanned) return {ok: false, reason: 'already_scanned', reservation: reservation};

        return {ok: true, reservation};
    }
}