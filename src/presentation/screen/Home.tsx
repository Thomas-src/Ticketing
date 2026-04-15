import { StatusBar } from 'expo-status-bar';
import {Button, FlatList, Pressable, Text, View} from 'react-native';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import EventCard from "../components/EventCard";

const events = [
    {
        id: "1",
        title: "Concert Franz Ferdinand",
        beginDate: new Date(2026, 3, 2, 21, 0),
        endDate: new Date(2026, 3, 3, 0, 0),
        location: "Bruxelles ING Arena",
        eventTags: ["concert", "musique"],
    },
    {
        id: "2",
        title: "Les ardentes",
        beginDate: new Date(2026, 6, 4, 12, 0),
        endDate: new Date(2026, 6, 4, 23, 0),
        location: "Rocourt",
        eventTags: ["festival", "RAP"],
    },
    {
        id: "3",
        title: "Garden HEC",
        beginDate: new Date(2026, 6, 18, 10, 30),
        endDate: new Date(2026, 6, 18, 23, 0),
        location: "Liège carré",
        eventTags: ["Etudiant", "Alcool"],
    },
    {
        id: "4",
        title: "ShowCase Gims",
        beginDate: new Date(2026, 4, 5, 18, 0),
        endDate: new Date(2026, 4, 5, 20, 0),
        location: "Bruxelles ING Arena",
        eventTags: ["Concert", "rap"],
    },
];

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
    return (
        <View style={styles.screen}>
            <Text style={styles.pageTitle}>Bonsoir John,</Text>

            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <EventCard
                        id={item.id}
                        title={item.title}
                        beginDate={item.beginDate}
                        endDate={item.endDate}
                        location={item.location}
                        eventTags={item.eventTags}
                    />
                )}
                contentContainerStyle={{ gap: 12 }}
            />
        </View>
    );
}

