import {Pressable, Text, View} from "react-native";
import {styles} from "../styles";

type Props = {
    title: string;
    backgroundColor: string;
    onPress: () => void;
}

export default function SettingCard({title, backgroundColor, onPress}: Props) {
    return (
        <View style={styles.settingCard}>
            <Pressable onPress={onPress} style={[styles.settingButton, {backgroundColor}]}>
                <Text style={styles.buttonWhiteText}>{title}</Text>
            </Pressable>
        </View>
    );
}