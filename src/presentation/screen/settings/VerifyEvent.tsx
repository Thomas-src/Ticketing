import {FlatList, Text, View} from 'react-native';
import {styles} from '../../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/RootStackParamList';
import {useInjection} from "../../hooks/ioc.react";
import {useEffect, useState} from "react";
import {Event} from "../../../domain/core/Event";
import EventCard from "../../components/EventCard";
import GetOwnerEvents from "../../../application/usecase/GetOwnerEvents"

type Props = NativeStackScreenProps<RootStackParamList>;


export default function ManageEvent({navigation}: Props) {
    const userEvents = useInjection<GetOwnerEvents>(GetOwnerEvents);

    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const loadEvents = async (isRefresh = false) => {
        try {
            if (isRefresh) setRefreshing(true);
            else setLoading(true);
            setError(null);
            const result = await userEvents.execute();
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
            <Text style={styles.pageTitle}>Vos évènements à vérifier</Text>

            <FlatList
                data={events}
                keyExtractor={(item: Event) => item.id}
                renderItem={({item}) => (
                    <EventCard event={item} actionName="Vérifier" action={() => navigation.navigate("VerifyTicket", {
                        eventId: item.id
                    })}/>
                )}
                contentContainerStyle={{gap: 12}}
                refreshing={loading}
                onRefresh={() => loadEvents(true)}
            />
        </View>
    );
}

