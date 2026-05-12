import {Event} from "../../../domain/core/Event"
import {Text, View} from "react-native";


type Props = {
    event: Event;
    count: number;
    names: string[];
    onClose: () => void;
};

export default function ReservationStep3(props: Props) {
    return (
        <View>
            <Text>TEST</Text>
        </View>
    )
}