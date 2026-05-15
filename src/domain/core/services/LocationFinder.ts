import {inject, injectable} from "inversify";
import ILocationRepository from "../../repository/ILocationRepository";
import {Location} from "../../../types/ScreenType";

@injectable()
export class LocationFinder {
    constructor(
        @inject(ILocationRepository)
        private repo: ILocationRepository
    ) {
    }

    async findLocation(location: string): Promise<Location[] | null> {
        return await this.repo.findLocation(location);
    }
}