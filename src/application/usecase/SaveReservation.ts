import {inject, injectable} from "inversify";
import IReservationRepository from "../../domain/repository/IReservationRepository";
import {Reservation} from "../../domain/core/Reservation";
import FullEventException from "../../domain/Exceptions/FullEventException";
import CreditCard from "../../domain/core/CreditCard";

@injectable()
export default class SaveReservation {

    constructor(@inject(IReservationRepository) private repo: IReservationRepository) {
    }

    async execute(reservation: Reservation, creditCard: CreditCard): Promise<void> {
        console.log(`Execute Reservation: ${reservation.event.title}`);

        if (!creditCard.isValid) {
            throw new Error("Carte de crédit invalide");
        }

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