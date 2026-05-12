import {Address} from "../../domain/core/Address";
import {Tag} from "../../domain/core/Tag";

export function toAddress(r: Address): Address {
    return new Address(
        r.name ?? "",
        r.address ?? "",
        r.city ?? "",
        r.street ?? "",
        r.postalCode ?? ""
    );
}


export function toTags(tags: Tag[]): Tag[] {
    return tags.map((t) => new Tag(t.name, t.slug));
}