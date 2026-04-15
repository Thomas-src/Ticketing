import {View} from 'react-native';
import {styles} from '../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import SettingNavigator from "../components/SettingNavigator";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Settings({navigation}: Props) {
    return (
        <View style={styles.container}>
            <SettingNavigator navigation={navigation}/>
        </View>
    );
}

