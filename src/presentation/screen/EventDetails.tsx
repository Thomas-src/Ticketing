import {Text, View} from 'react-native';
import ContextDetailsCard from "../components/eventDetails/ContextDetailsCard";
import ContextWhenCard from "../components/eventDetails/ContextWhenCard";
import ContextWhereCard from "../components/eventDetails/ContextWhereCard";

import {styles} from '../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, "Reservation">;

export default function EventDetails({route}: Props) {
    const {eventId} = route.params;
    return (
        <View style={styles.container}>
            <ContextDetailsCard></ContextDetailsCard>
            <ContextWhereCard></ContextWhereCard>
            <ContextWhenCard></ContextWhenCard>
        </View>
    );
}

