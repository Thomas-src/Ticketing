import {ComponentType} from "react";
import {LucideIcon} from "lucide-react-native";
import {RootStackParamList} from "./RootStackParamList";

export type ScreenType = {
    title: string;
    component: ComponentType<any>;
    icon: LucideIcon;
};

export type SettingType = {
    title: string;
    color: string;
    redirection: keyof RootStackParamList;
};