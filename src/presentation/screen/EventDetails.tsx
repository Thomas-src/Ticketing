import {Pressable, StyleSheet, Text, View, Share} from 'react-native';
import {useEffect, useState} from "react";

import ContextDetailsCard from "../components/eventDetails/ContextDetailsCard";
import ContextWhenCard from "../components/eventDetails/ContextWhenCard";
import ContextWhereCard from "../components/eventDetails/ContextWhereCard";

import {styles} from '../styles';
import {colors} from "../colors";
import {Share2} from 'lucide-react-native';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';

import EventRepositoryPocketBase from "../../infrastructure/repository/EventRepositoryPocketBase";
import DisplayEventDetails from "../../application/usecase/DisplayEventDetails";
import {Event} from "../../domain/core/Event";
import {Tag} from "../../domain/core/Tag";
import {useNavigation} from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

const repo = new EventRepositoryPocketBase();
const displayUC = new DisplayEventDetails(repo);
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EventDetails({route}: Props) {
    const navigation = useNavigation<NavigationProp>();


    const {eventId} = route.params;

    const [actualEvent, setActualEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await displayUC.execute(eventId);
                console.log("Affichage des détails de : " + event?.title)
                if (!event) {
                    navigation.goBack()
                } else {
                    setActualEvent(event);
                }
            } catch (error) {
                console.error("Erreur lors du chargement de l'event :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (!actualEvent) {
        return;
    }

    const shareEvent = async () => {
        if (!actualEvent) return;
        const startDate = new Date(actualEvent.startAt);

        const formattedDate = startDate.toLocaleDateString("fr-BE", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const formattedTime = startDate.toLocaleTimeString("fr-BE", {
            hour: "2-digit",
            minute: "2-digit",
        });

        try {
            await Share.share({
                message:
                    `🎉 ${actualEvent.title}\n\n` +
                    `${actualEvent.description}\n\n` +
                    `📍 ${actualEvent.address.address}\n` +
                    `📅 ${formattedDate} à ${formattedTime}\n\n` +
                    `Viens participer !`,
            });
        } catch (error) {
            console.error("Erreur lors du partage :", error);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, actual.container]}>

            <ContextDetailsCard
                name={actualEvent?.title}
                description={actualEvent?.description}
                tags={actualEvent?.tags?.map(t => t.name) ?? []}
                seatsLeft={actualEvent?.size}
                image={actualEvent?.image}
            />
            <ContextWhenCard
                beginDate={actualEvent?.startAt}
                endDate={actualEvent?.endAt}
            />
            <ContextWhereCard
                adress={actualEvent?.address}
            />

            <View style={actual.rowEnd}>
                <Pressable style={actual.shareButton} onPress={shareEvent}>
                    <Share2 color={colors.white}></Share2>
                </Pressable>
                <Pressable style={actual.buttonReservation} onPress={() => navigation.navigate("Reservation", {
                    event : actualEvent
                })}>
                    <Text style={actual.w}>
                        Réserver
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const actual = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 25
    },
    w: {
        color: colors.white,
    },
    rowEnd: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 15,
        alignItems: "center"
    },
    buttonReservation: {
        padding: 12,
        backgroundColor: colors.blue,
        borderRadius: 10,
    },
    shareButton: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: colors.lightBlue,
    }
})