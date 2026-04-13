import { View, Text, Image } from "react-native";
import { styles } from "../../../styles";

type Props = {
    title: string;
    image: string;
}

export default function EventCard({ title, image }: Props) {
    return (
        <View style={styles.card}>
            <Image
                src={image}
                style={styles.image}
            />
            <Text style={styles.title2}>{title}</Text>
        </View>
    );
}