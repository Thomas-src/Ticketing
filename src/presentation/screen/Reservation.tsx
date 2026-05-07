import {styles} from '../styles';
import {colors} from "../colors";
import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types/RootStackParamList";
import EventRepositoryPocketBase from "../../infrastructure/repository/EventRepositoryPocketBase";
import DisplayEventReservation from "../../application/usecase/DisplayEventReservation";
import {View, Text, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Reservation">;

const repo = new EventRepositoryPocketBase();
const displayUC = new DisplayEventReservation(repo);
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function Reservation({route}: Props) {
    const navigation = useNavigation<NavigationProp>();

    const {event} = route.params
    if (!event) {
        navigation.goBack();
        return;
    }

    return (
        <View style={[styles.container, style.container]}>
            <Text>{event.title}</Text>
        </View>
    );

}

const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 25
    },
})