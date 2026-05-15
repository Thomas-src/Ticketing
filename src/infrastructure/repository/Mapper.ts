import {Address} from "../../domain/core/Address";
import {Tag} from "../../domain/core/Tag";
import {Event} from "../../domain/core/Event";
import {pb} from "../pocketbaseClient";

export function toAddress(r: Address): Address {
    return new Address(
        r.name ?? "",
        r.address ?? "",
        r.city ?? "",
    );
}

export function mapEvent(r: any): Event {
    return new Event(
        r.id,
        r.title,
        r.description,
        r.size,
        new Date(r.startAt),
        new Date(r.endAt),
        pb.files.getURL(r, r.image),
        toTags(r.expand?.tags ?? []),
        r.price,
        toAddress(r.expand?.locations)
    );
}


export function toTags(tags: Tag[]): Tag[] {
    return tags.map((t) => new Tag(t.name));
}