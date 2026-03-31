import { Text, View } from 'react-native';
import { styles } from '@/styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/RootStackParamList';
import { useEffect, useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export default function Game({ route }: Props) {
    const title = route.params.title ?? "Inconnue";

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Partie ave le niveau {title}</Text>
            <Text style={styles.timer}>Temps: {timer} s</Text>
        </View>
    );
}

