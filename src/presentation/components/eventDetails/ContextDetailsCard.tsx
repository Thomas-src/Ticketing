import {View, Text, StyleSheet} from "react-native";
import {styles} from "../../styles";

import create = StyleSheet.create;

type Props = {
    name?: string;
    description?: string;
    seatsLeft?: number;
    tags?: string[];

}

export default function ContextDetailsCard(props: Props) {
    return <View style={CardStyle.container}>
        <Text style={styles.title}>{props.name}</Text>
    </View>
}

const CardStyle = StyleSheet.create({
        container: {
          flex: 1,
            marginTop: 50
        }
    }
)