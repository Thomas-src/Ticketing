import {SettingType} from "../../types/ScreenType";
import {FlatList, View} from "react-native";
import {styles} from "../styles";
import SettingCard from "../components/SettingCard";
import {RootStackParamList} from "../../types/RootStackParamList";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {colors} from "../colors";

const navigations: SettingType[] = [
    {
        title: "S'inscrire",
        redirection: "Signup",
        color: colors.blue
    },
    {
        title: "Se connecter",
        redirection: "Login",
        color: colors.blue
    }
];
type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList>;
};
export default function Settings({navigation}: Props) {
    return (
        <View style={styles.container}>
            <FlatList
                data={navigations}
                renderItem={({item}) =>
                    <SettingCard
                        title={item.title}
                        backgroundColor={item.color}
                        onPress={() => navigation.navigate(item.redirection as any)}
                    />
                }/>
        </View>
    )
}

