import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from "react-native";
import {HouseIcon, TicketsIcon, UserIcon} from "lucide-react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Layout from '../components/_layout';
import AccountNavigator from './AccountNavigator';

import Home from '../screen/Home';
import Tickets from '../screen/Tickets';

import {styles} from "../styles";
import {colors} from "../colors";
import EventDetails from "../screen/EventDetails";
import TicketsDetails from "../screen/TicketsDetails";

function withLayout(Component: React.ComponentType<any>) {
    return function WrappedScreen(props: any) {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
}

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
            <Tab.Screen
                name="Accueil"
                component={withLayout(Home)}
                options={{
                    tabBarLabel: ({focused}) => (
                        <Text style={{
                            fontSize: 12,
                            color: colors.white,
                            marginTop: 2,
                            fontWeight: focused ? '600' : '400'
                        }}>
                            Accueil
                        </Text>
                    ),
                    tabBarIcon: ({color}) => <HouseIcon color={color} size={22}/>,
                }}
            />
            <Tab.Screen
                name="Tickets"
                component={Tickets}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused}) => (
                        <View style={styles.ticketIcon}>
                            <TicketsIcon color={colors.blue} size={28}/>
                            <Text style={{
                                fontSize: 12,
                                color: colors.blue,
                                marginTop: 2,
                                fontWeight: focused ? '600' : '400'
                            }}>
                                Tickets
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="TicketsDetails"
                component={withLayout(TicketsDetails)}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: {display: 'none'},
                }}
            />
            {/* AccountNavigator gère Settings, Signup et Login — le footer reste visible */}
            <Tab.Screen
                name="Mon compte"
                component={AccountNavigator}
                options={{
                    tabBarLabel: ({focused}) => (
                        <Text style={{
                            fontSize: 12,
                            color: colors.white,
                            marginTop: 2,
                            fontWeight: focused ? '600' : '400'
                        }}>
                            Mon compte
                        </Text>
                    ),
                    tabBarIcon: ({color}) => <UserIcon color={color} size={22}/>,
                }}
            />
            <Tab.Screen
                name="Details"
                component={withLayout(EventDetails)}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: {display: 'none'},
                }}
            />
        </Tab.Navigator>
    );
}