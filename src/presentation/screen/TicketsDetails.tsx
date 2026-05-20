import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types/RootStackParamList";
import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";
import {Reservation} from "../../domain/core/Reservation";
import {inject} from "inversify";
import GetTicket from "../../application/usecase/GetTicket";
import {useInject} from "inversify-hooks";
import {useInjection} from "../hooks/ioc.react";
import {View, StyleSheet, Text, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/core";
import {styles} from "../styles";
import ContextWhenCard from "../components/eventDetails/ContextWhenCard";
import ContextWhereCard from "../components/eventDetails/ContextWhereCard";
import RecapView from "../components/ticket/RecapView";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = NativeStackScreenProps<RootStackParamList, "TicketsDetails">["route"];

export default function TicketsDetails() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();
    const {user} = useAuth();
    const ticketUC = useInjection<GetTicket>(GetTicket);
    const [ticket, setTicket] = useState<Reservation>();
    const [loading, setLoading] = useState(true);
    const {token} = route.params;

    useEffect(() => {
        if (!user) {
            navigation.navigate("Mon compte", {screen: "Login"});
            return;
        }

        ticketUC.execute(token).then(result => {
            setTicket(result);
            setLoading(false);
        });
    }, [token, user]);

    if (loading || !ticket) {
        return <View style={styles.screen}>
            <Text>Chargement...</Text>
        </View>
    }

    return <ScrollView contentContainerStyle={[styles.screen, style.container]}>
        <Text style={style.title}>{ticket.event.title}</Text>
        <ContextWhereCard adress={ticket.event.address} />
        <ContextWhenCard
            beginDate={ticket.event.startAt}
            endDate={ticket.event.endAt}
        />
        <RecapView pticket={ticket} />
    </ScrollView>
}

const style = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 12,
        paddingBottom: 32, // évite que le dernier élément colle au bas
    },
    title: {
        fontSize: 24,
        marginHorizontal: 'auto',
        marginTop: 20,
    }
});
