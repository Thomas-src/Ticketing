import IEventsRepository from "../../domain/repository/IEventsRepository";
import {inject} from "inversify";
import IReservationRepository from "../../domain/repository/IReservationRepository";


export default class DisplayEventDetails {
    constructor(
        @inject(IEventsRepository)
        private repo: IEventsRepository,
        @inject(IReservationRepository)
        private reservationRepo: IReservationRepository
    ) {
    }

    async execute(id: string) {
        const event = await this.repo.findEventById(id);
        if (!event) return null;

        const allReservation = await this.reservationRepo.getReservationsForEvent(id);
        const totalReservations = allReservation.reduce(
            (total, current) => total + current.quantity, 0  // tu avais aussi oublié le "total +" ici
        );

        event.sizeLeft = event.size - totalReservations;

        return event;
    }
}