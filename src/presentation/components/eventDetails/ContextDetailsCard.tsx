import {View, Text, StyleSheet} from "react-native";
import {styles} from "../../styles";

import create = StyleSheet.create;


export default function ContextDetailsCard(){
    return <View style={CardStyle.container}>
        <Text style={styles.title}>Details</Text>
    </View>
}

const CardStyle = StyleSheet.create({
        container: {
          flex: 1,
            marginTop: 50
        }
    }
)