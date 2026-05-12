import {FlatList, Text, View} from 'react-native';
import {styles} from '../styles';
import EventCard from "../components/EventCard";
import {useAuth} from "../context/AuthContext";
import GetAvaiblesEvents from "../../application/usecase/GetAvaiblesEvents";
import {Event} from "../../domain/core/Event";
import {useEffect, useRef, useState} from "react";
import {useInjection} from "../hooks/ioc.react";

const getMessage = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour ";
    if (hour < 18) return "Bon après-midi ";
    return "Bonsoir ";
};

export default function Home() {
    const avaiblesEvents = useInjection<GetAvaiblesEvents>(GetAvaiblesEvents);

    const {user} = useAuth();
    const date = useRef(new Date()).current;
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const loadEvents = async (isRefresh = false) => {
        try {
            if (isRefresh) setRefreshing(true);
            else setLoading(true);
            setError(null);
            const result = await avaiblesEvents.execute(date);
            setEvents(result);
        } catch (e: unknown) {
            console.error(e);
            if (e instanceof Error) setError(e.message);
            else setError("Une erreur inconnue est survenue");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);
    if (loading) {
        return (
            <View style={styles.screen}>
                <Text>Chargement...</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.screen}>
                <Text style={{color: "red"}}>
                    {error}
                </Text>
            </View>
        );
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.pageTitle}>{getMessage() + (user?.name ?? "")} </Text>

            <FlatList
                data={events}
                keyExtractor={(item: Event) => item.id}
                renderItem={({item}) => (
                    <EventCard event={item}/>
                )}
                contentContainerStyle={{gap: 12}}
                refreshing={loading}
                onRefresh={() => loadEvents(true)}
            />
        </View>
    );
}

