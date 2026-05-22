import {Event} from "../../../domain/core/Event"
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {colors} from "../../colors";
import React, {useCallback, useState} from "react";
import {useInjection} from "../../hooks/ioc.react";
import SaveReservation from "../../../application/usecase/SaveReservation";
import {Reservation} from "../../../domain/core/Reservation";
import {useAuth} from "../../context/AuthContext";
import 'react-native-get-random-values';
import {v4 as uuid} from "uuid";
import CreditCard from "../../../domain/core/CreditCard";
import {styles} from "../../styles";

type Props = {
    event: Event;
    count: number;
    names: string[];
    onSucces: () => void;
    onFail: () => void;
    onBack: () => void;
};

export default function ReservationStep3(props: Props) {
    const saveReservationUC = useInjection<SaveReservation>(SaveReservation);

    const [iban, setIban] = useState("BE");
    const [expirationMonth, setExpirationMonth] = useState("");
    const [expirationYear, setExpirationYear] = useState("");
    const [cvc, setCvc] = useState("");
    const [errors, setErrors] = useState<string>("");

    const {user} = useAuth();

    const yearSub = new Date().getFullYear().toString().slice(0, 2);
    console.log(yearSub)

    const formCorrect = useCallback(() => {
        const ibanRegex = /^BE\d{14}$/;
        const monthRegex = /^(0[1-9]|1[0-2])$/;
        const yearRegex = /^(202[6-9]|20[3-9]\d|2[1-9]\d{2}|[3-9]\d{3})$/;
        const cvcRegex = /^\d{3,4}$/;

        return (
            ibanRegex.test(iban) &&
            monthRegex.test(expirationMonth) &&
            yearRegex.test(expirationYear) &&
            cvcRegex.test(cvc)
        );
    }, [iban, expirationMonth, expirationYear, cvc]);

    // Enregistrer la reservation, si aucun crash alors on va vers la page succes, sinon fail
    const nextPage = async () => {
        const guests = [...props.names]; // copie indépendante
        const quantity = guests.length;
        const token = uuid();

        const reservation = new Reservation(user, quantity, props.event, guests, token, false);
        let creditCard = null;
        try {
            creditCard = new CreditCard(iban, parseInt(cvc), parseInt(expirationMonth), parseInt(expirationYear));
        } catch (error) {
            if (error instanceof Error) {
                setErrors(error.message);
            }
            return;
        }

        if (errors === "") {
            try {
                await saveReservationUC.execute(reservation, creditCard);
                props.onSucces()
            } catch (error) {
                props.onFail();
            }
        }
    }

    return (
        <View style={style.page}>
            <View style={style.container}>
                <View style={style.stepsContainer}>
                    <View style={[style.reservationState, style.reservationStateActive]}/>
                    <View style={[style.reservationState, style.reservationStateActive]}/>
                    <View style={[style.reservationState, style.reservationStateActive]}/>
                </View>
                <View>
                    <Text style={style.title}>Réservation</Text>
                </View>

                <View style={style.container}>
                    <View>

                        <Text>Iban : </Text>
                        <TextInput
                            style={style.input}
                            value={iban}
                            onChangeText={setIban}
                            maxLength={16}
                        ></TextInput>
                    </View>
                    <View style={style.flex}>
                        <View style={style.fieldGroup}>
                            <Text>Expiration : </Text>
                            <View style={style.expirationGroup}>


                                <TextInput
                                    style={[style.input, style.expirationInput]}
                                    keyboardType="numeric"
                                    onChangeText={setExpirationMonth}
                                    maxLength={2}
                                />
                                <Text>/</Text>
                                <TextInput
                                    style={[style.input, style.expirationInput]}
                                    keyboardType="numeric"
                                    onChangeText={(r => setExpirationYear(String(yearSub) + r))}
                                    maxLength={2}
                                />
                            </View>
                        </View>
                        <View style={style.fieldGroup}>
                            <Text>Code CVC : </Text>
                            <TextInput
                                style={style.input}
                                keyboardType="numeric"
                                onChangeText={setCvc}
                                maxLength={4}
                            />
                        </View>
                    </View>
                </View>
                <View style={style.marginAuto}>
                    <Text style={style.endText}>Total à payer : {props.event.price * props.count}€</Text>
                </View>
            </View>

            <View style={style.buttonsStyles}>
                <Pressable style={style.backButton} onPress={() => props.onBack()}>
                    <Text style={style.ButtonText}>Retour</Text>
                </Pressable>
                <Pressable style={[style.nextButton, !formCorrect() && style.inputDisabled]} onPress={() => nextPage()}
                           disabled={!formCorrect()}>
                    <Text style={[style.ButtonText, style.w]}>Continuer</Text>
                </Pressable>
                {errors !== "" && (
                    <Text style={styles.colorRed}>{errors}</Text>
                )}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    w: {
        color: colors.white,
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        gap: 100
    },
    fieldGroup: {
        flex: 1,
        flexDirection: "column",
    },
    page: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    stepsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    reservationState: {
        width: "30%",
        height: 14,
        borderRadius: 7,
        backgroundColor: colors.grey,
    },
    reservationStateActive: {
        backgroundColor: colors.blue,
        borderColor: colors.blue,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
    },
    inputGroup: {
        marginBottom: 10,
    },
    label: {
        fontWeight: "500",
    },
    input: {
        backgroundColor: colors.grey,
        color: colors.black,
        borderRadius: 8,
        height: 40,
        marginTop: 5,
        paddingHorizontal: 10,
    },
    buttonsStyles: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 'auto',
    },
    backButton: {
        width: "30%",
        backgroundColor: colors.grey,
        padding: 10,
        borderRadius: 5,
    },
    ButtonText: {
        margin: "auto",
        textAlign: "center",
    },
    nextButton: {
        backgroundColor: colors.blue,
        width: "30%",
        borderRadius: 5,
        padding: 10,
    },
    inputDisabled: {
        opacity: 0.6,
        backgroundColor: colors.lightBlue,
    },
    marginAuto: {
        margin: "auto",
    },
    endText: {
        fontWeight: "bold",
        color: colors.blue,
    },
    expirationGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    expirationInput: {
        flex: 1
    }
});