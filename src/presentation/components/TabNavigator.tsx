import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from "react-native";
import {HouseIcon, TicketsIcon, UserIcon} from "lucide-react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Layout from '../components/_layout';

import Home from '../screen/Home';
import Tickets from '../screen/Tickets';
import Settings from '../screen/Settings';

import {ScreenType} from "../../types/ScreenType";
import {styles} from "../styles";
import {colors} from "../colors";

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
        title: 'Tickets',
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
    const insets = useSafeAreaInsets();
    const TAB_HEIGHT = 60;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,

                tabBarStyle: {
                    backgroundColor: colors.blue,
                    height: TAB_HEIGHT + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 6,
                    paddingHorizontal: 16,
                    borderTopWidth: 0,
                },

                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.inactive,
            }}
        >
            {navigations.map(({title, component, icon: Icon}, index) => {
                const isCenter = index === 1;

                return (
                    <Tab.Screen
                        key={title}
                        name={title}
                        component={withLayout(component)}
                        options={{
                            tabBarLabel: ({focused}) => {
                                if (isCenter) {
                                    return null;
                                }
                                return (
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: colors.white,
                                            marginTop: 2,
                                            fontWeight: focused ? '600' : '400',
                                        }}
                                    >
                                        {title}
                                    </Text>
                                );
                            },

                            tabBarIcon: ({color, focused}) => {
                                if (isCenter) {
                                    return (
                                        <View style={styles.ticketIcon}>
                                            <Icon color={colors.blue} size={28}/>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: colors.blue,
                                                    marginTop: 2,
                                                    fontWeight: focused ? '600' : '400',
                                                }}
                                            >
                                                {title}
                                            </Text>
                                        </View>
                                    );
                                }

                                return (
                                    <Icon color={color} size={22}/>
                                );
                            },
                        }}
                    />
                );
            })}
        </Tab.Navigator>
    );
}