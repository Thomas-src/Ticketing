import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Tickets from '../screen/Tickets';
import Settings from '../screen/Settings';

const Tab = createBottomTabNavigator();

export default function Footer() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Tickets" component={Tickets} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}