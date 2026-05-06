import {StyleSheet, View, Text, Pressable} from "react-native";
import {colors} from "../../colors";
import {styles} from "../../styles";
import {MapPin} from 'lucide-react-native';
import {SquareArrowOutUpRight} from 'lucide-react-native';
import {Address} from "../../../domain/core/Address";
import {Platform, Linking} from "react-native";

type Props = {
    adress?: Address;
}

const openMaps = (props: Props) => {
    if (!props.adress) {
        return;
    }

    const {street, postalCode, city} = props.adress;

    const address = `${street}, ${postalCode} ${city}`;
    let url = "";
    if (Platform.OS === 'ios') {
        url = `http://maps.apple.com/?daddr=${encodeURIComponent(address)}`;
    } else {
        url = `geo:0,0?q=${encodeURIComponent(address)}`;
    }

    Linking.openURL(url);
}

export default function ContextWhereCard(props: Props) {

    if (!props.adress) {
        return null;
    }

    return (
        <View style={cardStyles.container}>
            <View style={cardStyles.fContainer}>
                <MapPin color={colors.white}></MapPin>
                <Text style={[cardStyles.w, cardStyles.title]}>Où ?</Text>
            </View>
            <View style={cardStyles.sContainer}>
                <View style={cardStyles.row}>
                    <Text style={[cardStyles.w, cardStyles.strong]}>Nom : </Text>
                    <Text style={[cardStyles.w]}>{props.adress?.name}</Text>
                </View>
                <View style={[cardStyles.row, cardStyles.spacebtw]}>
                    <View style={cardStyles.row}>
                        <Text style={[cardStyles.w, cardStyles.strong]}>Adresse : </Text>
                        <Text style={[cardStyles.w]}>
                            {props.adress
                                ? `${props.adress.street}\n${props.adress.postalCode} ${props.adress.city}`
                                : ""}
                        </Text>
                    </View>
                    <View>
                        <Pressable style={[cardStyles.button, cardStyles.row, cardStyles.gap]} onPress={() => openMaps(props)}>
                            <Text style={cardStyles.db}>Itinéraire</Text>
                            <SquareArrowOutUpRight color={colors.blue} height={15} width={15}/>
                        </Pressable>
                    </View>
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
    spacebtw: {
        justifyContent: "space-between",
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
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    fContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    sContainer: {
        padding: 8,
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    gap: {
        gap: 4
    },
    strong: {
        fontWeight: "bold",
    }
});