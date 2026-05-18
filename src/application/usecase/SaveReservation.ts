import {inject, injectable} from "inversify";
import IEventsRepository from "../../domain/repository/IEventsRepository";
import IReservationRepository from "../../domain/repository/IReservationRepository";
import {Reservation} from "../../domain/core/Reservation";
import {Event} from "../../domain/core/Event";
import FullEventException from "../../domain/Exceptions/FullEventException";

@injectable()
export default class SaveReservation {

    constructor(@inject(IReservationRepository) private repo: IReservationRepository) {}

    async execute(reservation: Reservation): Promise<void> {
        console.log(`Execute Reservation: ${reservation.event.title}`);

        const allReservation = await this.repo.getReservationsForEvent(reservation.event.id);

        const totalReservations = allReservation.reduce(
            (total, current) => total + current.quantity,
            0
        );

        if (totalReservations >= reservation.event.size) {
            throw new FullEventException("L'événement est complet");
        }

        try {
            await this.repo.saveReservation(reservation);
        } catch (error) {
            throw new Error("Erreur");
        }

    }

}