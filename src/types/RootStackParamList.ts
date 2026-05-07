import {Event} from "../domain/core/Event"

export type RootStackParamList = {
    MainTabs: undefined;
    Details: { eventId: string };
    Reservation: {event: Event};
    Settings: undefined;
    Signup: undefined;
    Login: undefined;
    Home: undefined;
};