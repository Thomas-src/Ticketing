import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import EventDetails from "../screen/EventDetails";
import {RootStackParamList} from "../../types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainTabs" component={TabNavigator}/>
            <Stack.Screen name="Details" component={EventDetails}/>
        </Stack.Navigator>
    );
}