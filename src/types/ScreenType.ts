import {ComponentType} from "react";
import {LucideIcon} from "lucide-react-native";

export type ScreenType = {
    title: string;
    component: ComponentType<any>;
    icon: LucideIcon;
};