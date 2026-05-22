import {SectionList, Text, View} from 'react-native';
import {styles} from '../styles';
import {RootStackParamList} from '../../types/RootStackParamList';
import {useAuth} from "../context/AuthContext";
import {useCallback, useRef, useState} from "react";
import {useInjection} from "../hooks/ioc.react";
import UserTickets from "../../application/usecase/UserTickets";
import {Reservation} from "../../domain/core/Reservation";
import EventCard from "../components/EventCard";
import {colors} from "../colors";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useFocusEffect} from "@react-navigation/core";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function Tickets() {
    const navigation = useNavigation<NavigationProp>();

    const {user} = useAuth();
    const ticketUC = useInjection<UserTickets>(UserTickets);
    const [tickets, setTickets] = useState<Reservation[]>([]);
    const [initialLoaded, setInitialLoaded] = useState(false);
    const ticketsRef = useRef<Reservation[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTickets = useCallback(async () => {
        const result = await ticketUC.execute();
        const newTickets = result ?? [];

        const hasChanged =
            newTickets.length !== ticketsRef.current.length ||
            newTickets.some((t, i) => t.token !== ticketsRef.current[i]?.token);

        if (hasChanged) {
            ticketsRef.current = newTickets;
            setTickets(newTickets);
        }
    }, [ticketUC]);

    useFocusEffect(
        useCallback(() => {
            if (!user) {
                navigation.navigate("Mon compte", {screen: "Login"});
                return;
            }

            let cancelled = false;

            fetchTickets().then(() => {
                if (!cancelled) setInitialLoaded(true);
            });

            return () => {
                cancelled = true;
            };
        }, [user, navigation, fetchTickets])
    );

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchTickets();
        setRefreshing(false);
    }, [fetchTickets]);

    if (!user || !initialLoaded) return null;

    const now = new Date();
    const upcomingTickets = tickets.filter(r => r.event.endAt >= now);
    const expiredTickets = tickets.filter(r => r.event.endAt < now);
    const isEmpty = upcomingTickets.length === 0 && expiredTickets.length === 0;

    if (isEmpty) {
        return (
            <View style={styles.screen}>
                <Text style={styles.pageTitle}>Mes tickets</Text>
                <Text style={[styles.ecDate, {textAlign: 'center', marginTop: 32}, {color: colors.black}]}>
                    Aucun ticket pour le moment.
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.screen]}>
            <SectionList
                onRefresh={handleRefresh}
                refreshing={refreshing}
                sections={[
                    {title: "Mes tickets", data: upcomingTickets},
                    {title: "Tickets expirés", data: expiredTickets},
                ]}
                keyExtractor={(item) => item.token}
                renderItem={({item}) => (
                    <EventCard
                        event={item.event}
                        action={() => navigation.navigate("TicketsDetails", {token: item.token})}
                        actionName="Détails"
                    />
                )}
                renderSectionHeader={({section: {title, data}}) =>
                    data.length > 0
                        ? <Text style={styles.pageTitle}>{title}</Text>
                        : null
                }
                stickySectionHeadersEnabled={false}
                contentContainerStyle={{gap: 8}}
            />
        </View>
    );
}