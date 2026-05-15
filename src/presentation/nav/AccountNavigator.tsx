import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "../screen/Settings";
import Signup from "../screen/account/Signup";
import Login from "../screen/account/Login";
import Layout from "../components/_layout";
import {RootStackParamList} from "../../types/RootStackParamList";
import CreateEvent from "../screen/settings/CreateEvent";
import ManageEvent from "../screen/settings/ManageEvent";
import VerifyTicket from "../screen/settings/VerifyTicket";
import ManageTeam from "../screen/settings/ManageTeam";
import EditEvent from "../screen/settings/EditEvent";
import VerifyEvent from "../screen/settings/VerifyEvent";

const Stack = createNativeStackNavigator<RootStackParamList>();

function withLayout(Component: React.ComponentType<any>) {
    return function WrappedScreen(props: any) {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
}

export default function AccountNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Settings" component={withLayout(Settings)}/>
            <Stack.Screen name="Signup" component={withLayout(Signup)}/>
            <Stack.Screen name="Login" component={withLayout(Login)}/>
            <Stack.Screen name="CreateEvent" component={withLayout(CreateEvent)}/>
            <Stack.Screen name="ManageEvent" component={withLayout(ManageEvent)}/>
            <Stack.Screen name="ManageTeam" component={withLayout(ManageTeam)}/>
            <Stack.Screen name="EditEvent" component={withLayout(EditEvent)}/>

            <Stack.Screen name="VerifyEvent" component={withLayout(VerifyEvent)}/>
            <Stack.Screen name="VerifyTicket" component={withLayout(VerifyTicket)}/>
        </Stack.Navigator>
    );
}