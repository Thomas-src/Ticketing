import {Text, View} from 'react-native';
import {styles} from '../../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AccountStackParamList} from '../../../types/RootStackParamList';

type Props = NativeStackScreenProps<AccountStackParamList>;

export default function ManageTeam({navigation}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur la page de gérance de l'équipe</Text>
        </View>
    );
}

