import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, Text, View } from 'react-native';
import { styles } from '../styles/styles';
import PrimaryButton from '@/components/PrimaryButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/RootStackParamList';

const buttons = [
    { title: "Facile" },
    { title: "Moyen" },
    { title: "Difficile" },
];

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur le Sudoku!</Text>
            <View style={styles.section}>
                {buttons.map((button, index) => (
                    <PrimaryButton
                        key={index}
                        title={button.title}
                        onPress={() => navigation.navigate("Game", { title: button.title })}
                    />
                ))}
            </View>
        </View>
    );
}

