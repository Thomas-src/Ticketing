export type RootStackParamList = {
    MainTabs: undefined;

    Settings: undefined;
    Signup: undefined;
    Login: undefined;
    Home: undefined;
    Details: { eventId: string };
    // settings
    CreateEvent: undefined;
    ManageEvent: undefined;
    ManageTeam: undefined;
    VerifyEvent: undefined;
    VerifyTicket: { eventId: string };
    EditEvent: { eventId: string };

};