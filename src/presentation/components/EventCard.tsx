import {FlatList, Image, Pressable, Text, View} from "react-native";
import {styles} from "../styles";
import {MapPin} from "lucide-react-native";
import {colors} from "../colors";
import {Event} from "../../domain/core/Event"
import {useCallback} from "react";

type Props = {
    event: Event;
    action: () => void;
    actionName: string;
};


export default function EventCard({event, action, actionName}: Props) {
    const {title, startAt, endAt, tags, address} = event;
    const formatHour = useCallback((date: Date) => {
        return date.toLocaleTimeString("fr-BE", {
            hour: "2-digit",
            hour12: false,
        });
    }, []);

    return (
        <View style={styles.eventCard}>

            <View style={styles.ecimageContainer}>
                <Image source={{uri: event.image}} style={styles.image}></Image>
            </View>

            <View style={styles.flex}>
                <View style={styles.ecContainerInf}>
                    <Text style={styles.ecTitle}>{title}</Text>
                    <Text style={styles.ecDate}>
                        {startAt.toLocaleDateString("fr-BE", {
                            day: "numeric",
                            month: "long",
                        })} à {formatHour(startAt)} - {formatHour(endAt)}
                    </Text>
                    <View style={styles.eclocationContainer}>
                        <MapPin color={colors.white}/>
                        <Text style={styles.ecLocation}>{address.name}</Text>
                    </View>
                </View>

                <View style={styles.ecContainerBut}>
                    <View style={styles.ecButtonContainer}>
                        <Pressable style={styles.button} onPress={action}>
                            <Text style={styles.buttonText}>{actionName}</Text>
                        </Pressable>

                    </View>
                    <View style={styles.ecTagsContainer}>
                        <FlatList
                            horizontal={true}
                            data={tags}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => (
                                <Text style={styles.tag}>{item.name}</Text>
                            )}
                            contentContainerStyle={{gap: 3}}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}