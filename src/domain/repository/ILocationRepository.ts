import {Location} from "../../types/ScreenType";

export default abstract class ILocationRepository {
    abstract findLocation(location: string): Promise<Location[] | null>;
}