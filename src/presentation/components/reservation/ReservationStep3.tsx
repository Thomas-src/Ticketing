import {Event} from "../../../domain/core/Event"
import {FlatList, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {colors} from "../../colors";
import {useState} from "react";
import {inspect} from "node:util";

type Props = {
    event: Event;
    count: number;
    names: string[];
    onClose: () => void;
    onBack: () => void;
};

export default function ReservationStep3(props: Props) {
    const [iban, setIban] = useState("0");
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

                <View>
                    <Text>Iban : </Text>
                    <TextInput
                        style={style.input}
                        keyboardType="numeric"
                        onChangeText={setIban}
                    ></TextInput>
                    <View style={style.flex}>
                        <View style={style.flex}>
                            <Text>Expiration : </Text>
                            <TextInput
                                style={style.input}
                                keyboardType="numeric"
                                onChangeText={setIban}
                            ></TextInput>
                        </View>
                        <View style={style.flex}>
                            <Text>Expiration : </Text>
                            <TextInput
                                style={style.input}
                                keyboardType="numeric"
                                onChangeText={setIban}
                            ></TextInput>
                        </View>
                    </View>

                </View>
            </View>

            <View style={style.buttonsStyles}>
                <Pressable style={style.backButton} onPress={() => props.onBack()}>
                    <Text style={style.ButtonText}>Retour</Text>
                </Pressable>
                <Pressable style={style.nextButton} onPress={() => props.onClose()}>
                    <Text style={[style.ButtonText, style.w]}>Continuer</Text>
                </Pressable>
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
        justifyContent: "space-between",
        flexDirection: "row",
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
        gap: 15,
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
        borderRadius: 8,
        height: 20,
        marginTop: 5,
        paddingHorizontal: 5,
    },
    buttonsStyles: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    },
});