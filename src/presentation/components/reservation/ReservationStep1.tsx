import {View, Text, Pressable, StyleSheet, TextInput} from 'react-native';
import {styles} from '../../styles';
import {colors} from "../../colors";
import {Input} from "postcss";
import {useState} from "react";

type Props = {
    count: number
    onChange: (count: number) => void;
    onNext: () => void;
    onBack: () => void;
}


export default function ReservationStep1(props: Props) {
    const [count, setCount] = useState(1);
    const [inputText, setInputText] = useState("1");
    const price = 90; // Todo prendre le vrai prix

    const totalPrice = count * price;


    return (
        <View style={style.container}>
            <View style={style.stepsContainer}>
                <View style={[style.reservationState, style.reservationStateActive]}/>
                <View style={style.reservationState}/>
                <View style={style.reservationState}/>
            </View>
            <View>
                <Text style={style.title}>Réservation</Text>
            </View>
            <View>
                <Text>Nombre de places* : </Text>
                <TextInput
                    style={style.input}
                    keyboardType="numeric"
                    value={inputText}
                    onChangeText={(text) => {
                        setInputText(text);
                        const value = Math.max(1, parseInt(text) || 1);
                        setCount(value);
                        props.onChange(value);
                    }}
                ></TextInput>
            </View>
            <View style={style.priceContainer}>
                <Text style={style.textDesign}>{price} € par place</Text>
                <Text style={style.textDesign}>Total : {totalPrice} € </Text>
            </View>
            <View style={style.buttonsStyles}>
                <Pressable style={style.backButton} onPress={() => props.onBack()}><Text
                    style={style.ButtonText}>Retour</Text></Pressable>
                <Pressable style={style.nextButton} onPress={event => props.onNext()}><Text
                    style={[style.ButtonText, style.w]}>Continuer</Text></Pressable>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    w: {
        color: colors.white,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 15
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
    input: {
        backgroundColor: colors.grey,
        borderRadius: 8,
        height: 20,
        marginTop: 5,
        paddingHorizontal: 5
    },
    priceContainer: {
        margin: "auto",
        gap: 10
    },
    textDesign: {
        textAlign: "center",
        color: colors.blue,
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
    }
});