import {Event} from "../../../domain/core/Event"
import {FlatList, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {colors} from "../../colors";
import {useState} from "react";
import { Ban } from 'lucide-react-native';

type Props = {
    onClose: () => void;
};

export default function ReservationFail(props: Props) {
    return (
        <View style={style.page}>
            <View style={style.container}>
                <View style={style.stepsContainer}>
                    <View style={style.reservationState}/>
                </View>
                <Text style={style.title}>Une erreur s'est produite !</Text>
            </View>

            <View style={style.checkContainer}>
                <Ban color={colors.red} size={50}/>
            </View>

            <Pressable style={style.doneButton} onPress={props.onClose}>
                <Text style={style.doneButtonText}>Réessayer</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    page: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },
    container: {
        flexDirection: "column",
        gap: 10,
    },
    stepsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    reservationState: {
        width: "100%",
        height: 14,
        borderRadius: 7,
        backgroundColor: colors.red,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
    },
    checkContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    doneButton: {
        backgroundColor: colors.red,
        padding: 10,
        borderRadius: 5,
        width: "100%",
    },
    doneButtonText: {
        color: colors.white,
        textAlign: "center",
        fontWeight: "bold",
    },
});