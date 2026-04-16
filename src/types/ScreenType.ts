import {RootStackParamList} from "./RootStackParamList";

export type SettingType = {
    title: string;
    color: string;
    redirection?: keyof RootStackParamList;
    action?: 'logout';
};