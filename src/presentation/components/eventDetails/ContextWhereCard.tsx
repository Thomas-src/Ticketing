import {Linking, Platform, Pressable, StyleSheet, Text, View} from "react-native";
import {colors} from "../../colors";
import {MapPin, SquareArrowOutUpRight} from 'lucide-react-native';
import {Address} from "../../../domain/core/Address";
import {useCallback, useMemo} from "react";

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
    const formattedAddress = useMemo(() => {
        if (!props.adress?.address) return "";

        const [first, second] = props.adress.address.split(',');

        return second ? `${first},\n${second}` : first;
    }, [props.adress?.address]);

    if (!props.adress) {
        return null;
    }
    const handleOpenMaps = useCallback(() => {
        if (!props.adress) return;
        openMaps(props);
    }, [props.adress]);

    return (
        <View style={cardStyles.container}>
            <View style={cardStyles.fContainer}>
                <MapPin color={colors.white}/>
                <Text style={[cardStyles.w, cardStyles.title]}>Où ?</Text>
                <Pressable style={[cardStyles.button, cardStyles.row, cardStyles.gap]}
                           onPress={handleOpenMaps}>
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