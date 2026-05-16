import {FlatList, View} from "react-native";
import {styles} from "../styles";
import SettingCard from "../components/SettingCard";
import {RootStackParamList} from "../../types/RootStackParamList";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useAuth} from "../context/AuthContext";
import {getUserNavParameters} from "../nav/SettingsRouteList"
import {SettingType} from "../../types/ScreenType";
import AuthRepositoryPocketBase from "../../infrastructure/repository/AuthRepositoryPocketBase";

const authRepository = new AuthRepositoryPocketBase();
type Props = { navigation: NativeStackNavigationProp<RootStackParamList>; };

export default function Settings({navigation}: Props) {
    const {user} = useAuth();
    const handlePress = async (setting: SettingType) => {
        if (setting.action) {
            await authRepository.logout();
            navigation.reset({index: 0, routes: [{name: 'Login'}]})
        } else {
            navigation.navigate(setting.redirection as any);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={getUserNavParameters(user)}
                renderItem={({item}) =>
                    <SettingCard
                        title={item.title}
                        backgroundColor={item.color}
                        onPress={() => handlePress(item)}
                    />
                }/>
        </View>
    )
}

