import { View, Text, Image } from "react-native";
import { styles } from "../../../styles";

type Props = {
    title: string;
    description: string;
}

export default function EventCard({ title, description}: Props) {
    return (
        <View style={[styles.eventCard, styles.debugBorder]}>
            <Image source={require("../../../assets/Images/concert.png")} style={styles.eventCardImage}></Image>
            <Text style={styles.eventCardTitle}>{title}</Text>
            <Text>{description}</Text>
        </View>
    );
}