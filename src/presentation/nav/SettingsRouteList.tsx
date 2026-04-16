import {SettingType} from "../../types/ScreenType";
import {colors} from "../colors";
import User from "../../domain/core/User";

const navigations: SettingType[] = [
    {
        title: "S'inscrire",
        redirection: "Signup",
        color: colors.blue
    },
    {
        title: "Se connecter",
        redirection: "Login",
        color: colors.blue
    }
];

const UserNavigations: SettingType[] = [
    {
        title: "Créer un évènement",
        redirection: "Signup",
        color: colors.blue
    },
    {
        title: "Se déconnecter",
        action: "logout",
        color: colors.red
    }
];

const StaffNavigations: SettingType[] = [
    {
        title: "Créer un évènement",
        redirection: "Signup",
        color: colors.blue
    },
    {
        title: "Vérifier des tickets",
        redirection: "Signup",
        color: colors.blue
    },
    {
        title: "Se déconnecter",
        action: "logout",
        color: colors.red
    }
];

const AdminNavigations: SettingType[] = [
    {
        title: "Créer un évènement",
        redirection: "Signup",
        color: colors.blue
    },
    {
        title: "Gérer vos évènements",
        redirection: "Signup",
        color: colors.blue
    },

    {
        title: "Gérer votre équipe",
        redirection: "Signup",
        color: colors.blue
    },
    {
        title: "Vérifier des tickets",
        redirection: "Signup",
        color: colors.blue
    },
    {
        title: "Se déconnecter",
        action: "logout",
        color: colors.red
    }
];

export const getUserNavParameters = (user: User) => {
    if (user == null || user.role == null) return navigations;

    switch (user.role) {
        case "admin":
            return AdminNavigations;
        case "staff":
            return StaffNavigations;
        case "user":
            return UserNavigations;
        default:
            return navigations;
    }
};