import {Text, View} from 'react-native';
import {useEffect, useState} from "react";

import ContextDetailsCard from "../components/eventDetails/ContextDetailsCard";
import ContextWhenCard from "../components/eventDetails/ContextWhenCard";
import ContextWhereCard from "../components/eventDetails/ContextWhereCard";

import {styles} from '../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';

import EventRepositoryPocketBase from "../../infrastructure/repository/EventRepositoryPocketBase";
import DisplayEventDetails from "../../application/usecase/DisplayEventDetails";
import {Event} from "../../domain/core/Event";

type Props = NativeStackScreenProps<RootStackParamList, "Reservation">;

const repo = new EventRepositoryPocketBase();
const displayUC = new DisplayEventDetails(repo);

export default function EventDetails({route}: Props) {

    const {eventId} = route.params;

    const [actualEvent, setActualEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await displayUC.execute(Number(eventId));
                setActualEvent(event);
            } catch (error) {
                console.error("Erreur lors du chargement de l'event :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <ContextDetailsCard
                name={actualEvent?.name}
                description={actualEvent?.description}
                tags={actualEvent?.tags.toString()}
                seatsLeft={actualEvent?.seatsLeft}
            />
            <ContextWhereCard />
            <ContextWhenCard />
        </View>
    );
}