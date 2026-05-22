import {SectionList, Text, View} from 'react-native';
import {styles} from '../styles';
import {RootStackParamList} from '../../types/RootStackParamList';
import {useAuth} from "../context/AuthContext";
import {useCallback, useState} from "react";
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
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            if (!user) {
                navigation.navigate("Mon compte", {screen: "Login"});
                return;
            }

            let cancelled = false;
            setLoading(true);

            ticketUC.execute().then(result => {
                if (!cancelled) {
                    setTickets(result ?? []);
                    setLoading(false);
                }
            });

            return () => {
                cancelled = true;
            };
        }, [user, navigation])
    );

    if (!user || loading) return null;

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