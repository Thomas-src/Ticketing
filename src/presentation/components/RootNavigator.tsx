import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import Signup from "../screen/account/Signup";
import Login from "../screen/account/Signup";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainTabs" component={TabNavigator}/>
            <Stack.Screen name="Signup" component={Signup}/>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    );
}