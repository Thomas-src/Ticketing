import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {HouseIcon, TicketsIcon, UserIcon} from "lucide-react-native";

import {colors} from "../colors";
import Layout from '../components/_layout';

import Home from '../screen/Home';
import Tickets from '../screen/Tickets';
import Settings from '../screen/Settings';

import {ScreenType} from "../../types/ScreenType";

function withLayout(Component: React.ComponentType<any>) {
    return function WrappedScreen(props: any) {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
}


const navigations: ScreenType[] = [
    {
        title: 'Accueil',
        component: Home,
        icon: HouseIcon
    },
    {
        title: 'Mes Tickets',
        component: Tickets,
        icon: TicketsIcon
    },
    {
        title: 'Mon compte',
        component: Settings,
        icon: UserIcon
    }
];

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: colors.blue,
                },
                tabBarActiveTintColor: colors.grey,
                tabBarInactiveTintColor: colors.white,
            }}
        >
            {navigations.map(({title, component, icon: Icon}) => (
                    <Tab.Screen
                        key={title}
                        name={title}
                        component={withLayout(component)}
                        options={{
                            tabBarIcon: ({color, size, focused}) => (
                                <Icon
                                    color={color}
                                    size={focused ? size + 2 : size}
                                />
                            ),
                        }}
                    />
                )
            )}
        </Tab.Navigator>
    )
        ;
}