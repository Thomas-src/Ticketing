import {Text, View} from 'react-native';
import {styles} from '../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, "Reservation">;

export default function Reservation({route}: Props) {
    const {eventId} = route.params;
    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.center]}>Reservation pour l'id : {eventId}</Text>
        </View>
    );
}

