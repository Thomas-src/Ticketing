import {Reservation} from "../../../domain/core/Reservation";
import {View, StyleSheet, Text} from "react-native";
import {colors} from "../../colors"
import {useAuth} from "../../context/AuthContext";
import QRCode from "react-native-qrcode-svg";

type Props = {
    pticket: Reservation;
}

export default function RecapView(props: Props) {
    const {user} = useAuth();

    const participants: string[] = [];
    participants.push(user.name);
    participants.push(...props.pticket.guests);

    const totalPrice = () => {
        return props.pticket.quantity * props.pticket.event.price;
    }


    return <View style={style.content}>
        <Text style={style.title}>
            Ticket
        </Text>
        <View style={style.container}>
            <View style={style.w50}>
                <Text>Participants : </Text>
                {participants.map((participant, index) => (
                    <Text key={index} style={style.participant}>
                        • {participant}
                    </Text>
                ))}
            </View>
            <View style={style.w50}>
                <Text> Total payé : {totalPrice()} €</Text>
            </View>
        </View>
        <Text>
            <Text style={style.bold}>IMPORTANT</Text>
            <Text> : Merci de préparer vos/votre carte(s) d'identité afin de fluidifier l'entrée à cet événement</Text>
        </Text>
        <Text style={style.bold}>QR Code</Text>
        <View style={style.qrCode}>
            <QRCode
                value={props.pticket.token}
                size={200}
            />
        </View>
    </View>
}

const style = StyleSheet.create({
    content: {
        margin: "auto",
        width:
            "100%",
        backgroundColor:
        colors.grey,
        paddingVertical:
            12,
        paddingHorizontal:
            24,
        borderRadius:
            12,
        display:
            "flex",
        flexDirection:
            "column",
        gap:
            18,
        paddingBottom: 24
    }
    ,
    title: {
        fontSize: 16,
        fontWeight:
            "bold",
        color:
            "black",
    }
    ,
    container: {
        display: "flex",
        flexDirection:
            "row",
    }
    ,
    w50: {
        width: "50%",
    }
    ,
    participant: {
        marginLeft: 5,
    },
    bold: {
        fontWeight: "bold"
    },
    qrCode: {
        margin: "auto"
    }
});