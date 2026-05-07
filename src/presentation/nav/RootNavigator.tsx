import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import EventDetails from "../screen/EventDetails";
import {RootStackParamList} from "../../types/RootStackParamList";
import ReservationScreen from "../screen/Reservation";
import Reservation from "../screen/Reservation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainTabs" component={TabNavigator}/>
            <Stack.Screen name="Details" component={EventDetails}/>
            <Stack.Screen name="Reservation" component={Reservation}/>
        </Stack.Navigator>
    );
}