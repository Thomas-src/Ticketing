import {ComponentType} from "react";
import {LucideIcon} from "lucide-react-native";
import {AccountStackParamList} from "./RootStackParamList";

export type ScreenType = {
    title: string;
    component: ComponentType<any>;
    icon: LucideIcon;
};

export type SettingType = {
    title: string;
    color: string;
    redirection: keyof AccountStackParamList;
};