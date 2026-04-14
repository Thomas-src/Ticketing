import {View, Text, Image, Pressable} from "react-native";
import { styles } from "../styles";

type Props = {
    title: string;
    description: string;
    date: Date;
    location: string;
}

export default function EventCard({ title, description, date, location}: Props) {
    return (
        <View style={styles.eventCard}>

            <View style={styles.ecimageContainer}>
                <Image source={require("../../../assets/Images/concert.png")} style={styles.image}></Image>
            </View>

            <View style={[styles.flex, styles.debugBorder]}>

                <View style={[styles.ecContainerInf, styles.debugBorder]}>
                    <Text style={styles.ecTitle}>{title}</Text>
                    <Text style={styles.ecDate}>
                        {date.toLocaleDateString("fr-BE", {
                            day: "numeric",
                            month: "long",
                        })} à {date.getHours()}h
                    </Text>
                    <Text style={styles.ecLocation}>{location}</Text>
                </View>

                <View style={[styles.ecContainerBut, styles.debugBorder]}>
                    <View style={styles.ecButtonContainer}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Réserver</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </View>
    );
}