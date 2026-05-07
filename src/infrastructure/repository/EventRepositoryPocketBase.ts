import {IEventRepository} from "../../domain/repository/IEventRepository";
import {Event} from "../../domain/core/Event";
import {Tag} from "../../domain/core/Tag";
import {Address} from "../../domain/core/Address";

export default class EventRepositoryPocketBase implements IEventRepository {

    async getEventDetails(id: number): Promise<Event> {
        const tags = [new Tag("Concert", "concert"), new Tag("Musique", "musique")];

        const result = new Event(
            "qsd",
            "Concert Franz Ferdinant",
            "Ceci est une description",
            956,
            new Date(2026, 3, 1, 20, 0),
            new Date(2026, 3, 2, 0, 0),
            "../../assets/Images/concert.png",
            tags,
            "Owner",
            new Address("ING Arena", "Avenue des Miramar", "Bruxelles", 1020)
        )

        return result;
    }

}