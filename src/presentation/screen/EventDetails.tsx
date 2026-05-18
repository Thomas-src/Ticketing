import {Modal, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {useCallback, useEffect, useState} from "react";

import ContextDetailsCard from "../components/eventDetails/ContextDetailsCard";
import ContextWhenCard from "../components/eventDetails/ContextWhenCard";
import ContextWhereCard from "../components/eventDetails/ContextWhereCard";
import ReservationStep1 from "../components/reservation/ReservationStep1";
import ReservationStep2 from "../components/reservation/ReservationStep2";
import ReservationStep3 from "../components/reservation/ReservationStep3";

import {styles} from '../styles';
import {colors} from "../colors";
import {Share2} from 'lucide-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';

import DisplayEventDetails from "../../application/usecase/DisplayEventDetails";
import {Event} from "../../domain/core/Event";
import {useInjection} from "../hooks/ioc.react";
import ReservationSucces from "../components/reservation/ReservationSucces";
import ReservationFail from "../components/reservation/ReservationFail";
import {useAuth} from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function EventDetails({route, navigation}: Props) {
    const displayEvent = useInjection<DisplayEventDetails>(DisplayEventDetails);

    const {eventId} = route.params;

    const [actualEvent, setActualEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false); // Sert pour tout affiche l'écran de réservation par dessus l'écran de base
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(1); // Le nombre de participant incsrit
    const [names, setNames] = useState<string[]>([]);

    const {user} = useAuth();

    const reservationRedirect = useCallback(() => {
        if (user) {
            setModalVisible(true);
        } else {
            navigation.navigate("Mon compte", {screen: "Login"});
        }
    }, [user, navigation]);

    const resetModal = useCallback(() => {
        setModalVisible(false);
        setStep(1);
        setNames([]);
        setCount(0);
    }, []);

    const shareEvent = useCallback(async () => {
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
    }, [actualEvent]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await displayEvent.execute(eventId);
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
                seatsLeft={actualEvent?.sizeLeft}
                image={actualEvent?.image}
                price={actualEvent?.price}
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
                <Pressable style={actual.buttonReservation} onPress={() => reservationRedirect()}>
                    <Text style={actual.w}>
                        Réserver
                    </Text>
                </Pressable>
            </View>

            <Modal visible={modalVisible} transparent animationType="none" onRequestClose={resetModal}>
                <View style={actual.backdrop}>

                    <View style={actual.modalContainer}>
                        <View>

                            <View>
                                {[1, 2, 3].map(i => (
                                    <View key={i}/>
                                ))}
                            </View>

                            {step === 1 && (
                                <ReservationStep1
                                    event={actualEvent}
                                    count={count}
                                    onChange={setCount}
                                    onBack={resetModal}
                                    onNext={() => {
                                        setNames(Array(count).fill(''));
                                        setStep(2);
                                    }}
                                />
                            )}
                            {step === 2 && (
                                <ReservationStep2
                                    names={names}
                                    onChange={setNames}
                                    onBack={() => setStep(1)}
                                    onNext={() => setStep(3)}
                                    count={count.valueOf()}
                                />
                            )}
                            {step === 3 && (
                                <ReservationStep3
                                    event={actualEvent}
                                    count={count}
                                    names={names}
                                    onBack={() => setStep(2)}
                                    onFail={() => setStep(5)}
                                    onSucces={() => setStep(4)}
                                />
                            )}
                            {step === 4 && (
                                <ReservationSucces
                                    event={actualEvent}
                                    count={count}
                                    names={names}
                                    onClose={resetModal}/>
                            )}
                            {step === 5 && (
                                <ReservationFail onClose={() => setStep(1)}/>
                            )}

                        </View>
                    </View>
                </View>

            </Modal>
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
    },
    modalContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        marginHorizontal: "auto",
        marginTop: "40%",
        backgroundColor: colors.white,
        width: "90%",
        height: "30%",
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
})