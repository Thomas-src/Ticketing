import {Text, View} from "react-native";

type Props = {
    names: string[];
    onChange: (names: string[]) => void;
    onBack: () => void;
    onNext: () => void;
};

export default function ReservationStep2(props: Props) {
    return (
        <View>
            <Text>TEST</Text>
        </View>
    )
}