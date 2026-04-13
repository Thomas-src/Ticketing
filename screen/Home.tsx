import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';
import EventCard from "../components/EventCard";



type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bievenue sur la page d'accueil!</Text>
            <EventCard title={"Test"} image={"Image/7b66faf1ea70ea3ff5067945843502dfdb355032.png"}></EventCard>
        </View>
    );
}

