export type AccountStackParamList = {
    Settings: undefined;
    Signup: undefined;
    Login: undefined;
    CreateEvent: undefined;
    ManageEvent: undefined;
    ManageTeam: undefined;
    VerifyEvent: undefined;
    VerifyTicket: { eventId: string };
    EditEvent: { eventId: string };
};

export type RootStackParamList = {
    MainTabs: undefined;
    "Mon compte": { screen: keyof AccountStackParamList };

    Settings: undefined;
    Signup: undefined;
    Login: undefined;
    Home: undefined;
    Details: { eventId: string };
    Tickets: undefined;
    TicketsDetails: { token: string };
    // settings
    CreateEvent: undefined;
    ManageEvent: undefined;
    ManageTeam: undefined;
    VerifyEvent: undefined;
    VerifyTicket: { eventId: string };
    EditEvent: { eventId: string };
};