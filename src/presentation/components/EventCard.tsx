import {View, Text, Image, Pressable, FlatList} from "react-native";
import { styles } from "../styles";
import { MapPin } from "lucide-react-native";

type Props = {
    title: string;
    beginDate: Date;
    endDate: Date;
    location: string;
    eventTags: string[]; // TODO peut-etre changer en objet concret ?
}

export default function EventCard({ title, beginDate, endDate, location, eventTags}: Props) {
    const formatHour = (date: Date) => {
        return date.toLocaleTimeString("fr-BE", {
            hour: "2-digit",
            hour12: false,
        });
    };

    return (
        <View style={styles.eventCard}>

            <View style={styles.ecimageContainer}>
                <Image source={require("../../../assets/Images/concert.png")} style={styles.image}></Image>
            </View>

            <View style={styles.flex}>

                <View style={styles.ecContainerInf}>
                    <Text style={styles.ecTitle}>{title}</Text>
                    <Text style={styles.ecDate}>
                        {beginDate.toLocaleDateString("fr-BE", {
                            day: "numeric",
                            month: "long",
                        })} à {formatHour(beginDate)} - {formatHour(endDate)}
                    </Text>
                    <View style={styles.eclocationContainer}>
                        <MapPin style={styles.pinIcon} />
                        <Text style={styles.ecLocation}>{location}</Text>
                    </View>
                </View>

                <View style={styles.ecContainerBut}>
                    <View style={styles.ecButtonContainer}>
                        <Pressable style={styles.button} onPress={() => navigate("Reservation")}>
                            <Text style={styles.buttonText}>Réserver</Text>
                        </Pressable>

                    </View>
                    <View style={styles.ecTagsContainer}>
                        <FlatList
                            horizontal={true}
                            data={eventTags}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Text style={styles.tag}>{item}</Text>
                            )}
                            contentContainerStyle={{gap: 3}}
                        />
                    </View>

                </View>

            </View>
        </View>
    );
}