import {FlatList, View} from "react-native";
import {styles} from "../styles";
import SettingCard from "../components/SettingCard";
import {AccountStackParamList} from "../../types/RootStackParamList";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useAuth} from "../context/AuthContext";
import {getUserNavParameters} from "../nav/SettingsRouteList"
import {SettingType} from "../../types/ScreenType";
import AuthRepositoryPocketBase from "../../infrastructure/repository/AuthRepositoryPocketBase";
import {useCallback, useMemo} from "react";

const authRepository = new AuthRepositoryPocketBase();
type Props = { navigation: NativeStackNavigationProp<AccountStackParamList>; };

export default function Settings({navigation}: Props) {
    const {user} = useAuth();

    const navItems = useMemo(() => getUserNavParameters(user), [user]);

    const handlePress = useCallback(async (setting: SettingType) => {
        if (setting.action) {
            await authRepository.logout();
            navigation.reset({index: 0, routes: [{name: 'Login'}]});
        } else {
            navigation.navigate(setting.redirection as any);
        }
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={navItems}
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

