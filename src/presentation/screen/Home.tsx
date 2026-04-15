import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import EventCard from "../components/EventCard";



type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
    return (
        <View style={styles.screen}>
            <Text style={styles.pageTitle}>Bonsoir John,</Text>
            <EventCard
                title={"Concert Franz Ferdinand"}
                beginDate={new Date(2026,3,2,21,0)}
                endDate={new Date(2026,3,3, 0,0)}
                location={"Bruxelles ING arena"}
                eventTags={["concert", "musique"]}>
            </EventCard>
        </View>
    );
}

