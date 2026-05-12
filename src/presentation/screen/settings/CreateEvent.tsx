import {Text, View} from 'react-native';
import {styles} from '../../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/RootStackParamList';
import {useInjection} from "../../hooks/ioc.react";
import CreateNewEvent from "../../../application/usecase/CreateNewEvent";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function CreateEvent({navigation}: Props) {
    const createEvent = useInjection<CreateNewEvent>(CreateNewEvent);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur la page de création d'event!</Text>
        </View>
    );
}

