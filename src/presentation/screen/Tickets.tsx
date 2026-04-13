import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';



type Props = NativeStackScreenProps<RootStackParamList>;

export default function Tickets({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur la page de tickets!</Text>
        </View>
    );
}

