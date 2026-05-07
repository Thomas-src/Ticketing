import {IEventRepository} from "../../domain/repository/IEventRepository";


export default class DisplayEventDetails {
    constructor(private repository: IEventRepository) {

    }

    async execute(id: string) {
        return this.repository.findEventById(id);
    }
}