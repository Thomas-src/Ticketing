import {View, Text, StyleSheet, Image, FlatList} from "react-native";
import {styles} from "../../styles";
import {colors} from "../../colors";

type Props = {
    name?: string;
    description?: string;
    seatsLeft?: number;
    tags?: string[];
    image?: string;
}

export default function ContextDetailsCard(props: Props) {
    return <View style={CardStyle.container}>
        <View style={CardStyle.imageContainer}>
            <Image source={require("../../../../assets/Images/concert.png")} style={CardStyle.image}></Image>
        </View>

        <View style={CardStyle.contentContainer}>
            <Text style={[CardStyle.title, CardStyle.w]}>{props.name}</Text>
            <Text style={CardStyle.w}>{props.description}</Text>
            <View style={CardStyle.endContainer}>
                <Text style={CardStyle.w}>Nb places disponibles : {props.seatsLeft}</Text>
                <FlatList
                    horizontal={true}
                    contentContainerStyle={{ gap: 8 }}
                    style={{flexGrow:0}}
                    data={props.tags}
                    renderItem={({item}) => (
                        <Text style={styles.tag}>{item}</Text>
                    )}>
                </FlatList>
            </View>
        </View>
    </View>
}

const CardStyle = StyleSheet.create({
    w: {
        color: colors.white,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        marginTop: 50,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: colors.lightBlue,
        },
    imageContainer: {
        height: 150,

    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    contentContainer: {
        padding: 10,
        gap: 12,
    },
    endContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }

})