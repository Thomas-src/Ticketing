import {Text, View, StyleSheet, TextInput, Pressable, FlatList} from "react-native";
import {colors} from "../../colors";
import {useState} from "react";

type Props = {
    names: string[];
    onChange: (names: string[]) => void;
    onBack: () => void;
    onNext: () => void;
    count: number;
};

export default function ReservationStep2(props: Props) {
    const [names, setNames] = useState<string[]>(
        Array.from({length: props.count}, (_, i) => props.names[i] ?? "")
    );

    const handleChange = (text: string, index: number) => {
        const updated = [...names];
        updated[index] = text;
        setNames(updated);
        props.onChange(updated);
    };

    const allInputValid = () => {
        if (names.length == 0) {
            return false
        }

        // On commence a une car le premier sera toujours pour l'utilisateur courant qui commande
        for (let i = 1; i < names.length; i++) {
            if (names[i].trim() === "") {
                return false;
            }
        }

        console.log("Tout les champs sont rempli, passage à l'écran suivant")
        return true;
    };

    return (
        <View style={style.container}>
            <View style={style.stepsContainer}>
                <View style={[style.reservationState, style.reservationStateActive]}/>
                <View style={[style.reservationState, style.reservationStateActive]}/>
                <View style={style.reservationState}/>
            </View>
            <View>
                <Text style={style.title}>Réservation ({props.count})</Text>
            </View>

            <FlatList
                data={Array.from({length: props.count}, (_, i) => i)}
                keyExtractor={(item) => item.toString()}
                renderItem={({item: index}) => (
                    <View style={style.inputGroup}>
                        <Text style={style.label}>
                            {/*Todo renplacer par le nom prénom de l'utilisateur*/}
                            {index === 0 ? "Votre place :" : `Dénomination place ${index + 1}* :`}
                        </Text>
                        <TextInput
                            style={[style.input, index === 0 && style.inputDisabled]}
                            value={index === 0 ? "(Vous)" : names[index]}
                            onChangeText={(text) => index !== 0 && handleChange(text, index)}
                            editable={index !== 0}
                        />
                    </View>
                )}
            />

            <View style={style.buttonsStyles}>
                <Pressable style={style.backButton} onPress={() => props.onBack()}>
                    <Text style={style.ButtonText}>Retour</Text>
                </Pressable>
                <Pressable style={[style.nextButton, !allInputValid() && style.pressableDisabled]} onPress={() => {props.onNext()}} disabled={!allInputValid()}>
                    <Text style={[style.ButtonText, style.w]}>Continuer</Text>
                </Pressable>
            </View>
        </View>
    );
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
    inputDisabled:{
        opacity: 0.6,
    },
    pressableDisabled: {
        opacity: 0.6,
        backgroundColor : colors.lightBlue,
    },
});