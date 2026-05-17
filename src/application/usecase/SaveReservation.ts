import {inject, injectable} from "inversify";
import IEventsRepository from "../../domain/repository/IEventsRepository";
import IReservationRepository from "../../domain/repository/IReservationRepository";
import {Reservation} from "../../domain/core/Reservation";
import {Event} from "../../domain/core/Event";
import FullEventException from "../../domain/Exceptions/FullEventException";

@injectable()
export default class SaveReservation {

    constructor(@inject(IReservationRepository) private repo: IReservationRepository) {}

    async execute(event: Event, reservation: Reservation): Promise<void> {
        const allReservation = await this.repo.getReservationsForEvent(event.id);

        const totalReservations = allReservation.reduce(
            (total, current) => total + current.quantity,
            0
        );

        if (totalReservations >= event.size) {
            throw new FullEventException("L'événement est complet");
        }

        // TODO try ajouter la reservation, si exception alors on retourne exception sinon rien.
        throw new Error("Not yet implemented.");

    }

}