import {injectable} from "inversify";
import ILocationRepository from "../../domain/repository/ILocationRepository";
import {Location} from "../../types/ScreenType";
import {sanitize} from "../utils";

const apiKey = "pk.eyJ1IjoidGhvbWFzaGVsbW9iZSIsImEiOiJjbXAzeDJqN2EwY2lqMnNzY3R0eDgyb21mIn0.aqEAoj500bLhO6AEvVFG6w";

@injectable()
export default class LocationRepositoryMapBox extends ILocationRepository {
    async findLocation(location: string): Promise<Location[] | null> {
        try {
            if (!location || location.length < 5) {
                return [];
            }
            const clean = sanitize(location)

            const res = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    clean
                )}.json?access_token=${apiKey}&autocomplete=true&limit=5&language=fr`
            );

            const data = await res.json();

            if (!data.features) {
                return [];
            }

            return data.features.map((item: any): Location => {
                const [lon, lat] = item.center;

                return {
                    name: item.text || "",
                    address: item.place_name || "",
                    city:
                        item.context?.find((c: any) =>
                            c.id.startsWith("place")
                        )?.text || "",
                    lon,
                    lat,
                };
            });
        } catch (error) {
            console.log("error findLocation", error);
            return null;
        }
    }
}