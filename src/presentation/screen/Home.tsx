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
            <EventCard title={"Test"} description={"Ceci est une descirption"}></EventCard>
        </View>
    );
}

