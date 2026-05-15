import {RootStackParamList} from "./RootStackParamList";

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