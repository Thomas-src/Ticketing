import {IEventRepository} from "../../domain/repository/IEventRepository";
import {Event} from "../../domain/core/Event";
import {Tag} from "../../domain/core/Tag";
import {Address} from "../../domain/core/address";

export default class EventRepositoryPocketBase implements IEventRepository{

    async getEventDetails(id: number): Promise<Event> {
        const result = new Event(id,
            "Concert Franz Ferdinant",
            "Ceci est une description",
            [Tag.concert, Tag.musique],
            956,
            new Date(2026, 3, 1, 20, 0),
            new Date(2026, 3, 2, 0, 0),
            new Address("ING Arena", "Avenue des Miramar", "Bruxelles", 1020, 1)
            )

        return result;
    }

}