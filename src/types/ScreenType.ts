import {RootStackParamList} from "./RootStackParamList";
import {Reservation} from "../domain/core/Reservation";

export type SettingType = {
    title: string;
    color: string;
    redirection?: keyof RootStackParamList;
    action?: 'logout';
};

export type Location = {
    name: string;
    address: string;
    city?: string;
    lon: number;
    lat: number;
}

export type ValidationError = {
    field: string;
    message: string;
};
export type TicketError = "not_found" | "already_scanned" | "error";

export type VerifyResult = | { ok: true; reservation: Reservation } | {
    ok: false;
    reason: TicketError;
    reservation?: Reservation;
};