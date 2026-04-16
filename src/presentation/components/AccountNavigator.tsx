import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "../screen/Settings";
import Signup from "../screen/account/Signup";
import Login from "../screen/account/Signup"; // remplacer par le bon import Login si disponible
import Layout from "./_layout";

const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
    );
}