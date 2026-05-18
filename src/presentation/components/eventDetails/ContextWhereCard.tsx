import {Linking, Platform, Pressable, StyleSheet, Text, View} from "react-native";
import {colors} from "../../colors";
import {MapPin, SquareArrowOutUpRight} from 'lucide-react-native';
import {Address} from "../../../domain/core/Address";

type Props = {
    adress?: Address;
}

const openMaps = (props: Props) => {
    if (!props.adress) {
        return;
    }

    const address = props.adress.address;

    let url = "";
    if (Platform.OS === 'ios') {
        url = `http://maps.apple.com/?daddr=${encodeURIComponent(address)}`;
    } else {
        url = `geo:0,0?q=${encodeURIComponent(address)}`;
    }

    Linking.openURL(url);
}

export default function ContextWhereCard(props: Props) {
    const splittedAddress = props.adress?.address.split(',');
    const formattedAddress = splittedAddress?.at(0) + ',\n' + splittedAddress?.at(1);

    if (!props.adress) {
        return null;
    }

    return (
        <View style={cardStyles.container}>
            <View style={cardStyles.fContainer}>
                <MapPin color={colors.white}/>
                <Text style={[cardStyles.w, cardStyles.title]}>Où ?</Text>
                <Pressable style={[cardStyles.button, cardStyles.row, cardStyles.gap]}
                           onPress={() => openMaps(props)}>
                    <Text style={cardStyles.db}>Itinéraire</Text>
                    <SquareArrowOutUpRight color={colors.blue} height={15} width={15}/>
                </Pressable>
            </View>
            <View style={cardStyles.sContainer}>
                <View style={cardStyles.row}>
                    <Text style={[cardStyles.w, cardStyles.strong]}>Nom : </Text>
                    <Text style={cardStyles.w}>{props.adress.name}</Text>
                </View>
                <View style={cardStyles.adresseBlock}>
                    <Text style={[cardStyles.w, cardStyles.strong]}>Adresse : </Text>
                    <Text style={cardStyles.w}>{formattedAddress}</Text>
                </View>
            </View>
        </View>
    );
}

const cardStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightBlue,
        borderRadius: 12,
        padding: 10,
    },
    w: {
        color: colors.white,
    },
    db: {
        color: colors.blue,
    },
    button: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 12,
        marginLeft: 'auto',
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    fContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    sContainer: {
        padding: 8,
        gap: 6,
    },
    row: {
        flexDirection: "row",
    },
    gap: {
        gap: 4,
    },
    strong: {
        fontWeight: "bold",
    },
    adresseBlock: {
        flexDirection: "row",
        flexShrink: 1,
    },
});