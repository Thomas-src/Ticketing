import {Text, View} from 'react-native';
import {styles} from '../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {useAuth} from "../context/AuthContext";
import {useEffect} from "react";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Tickets({navigation}: Props) {
    const {user} = useAuth();

    useEffect(() => {
        if (!user) {
            navigation.navigate("Mon compte", {screen: "Login"});
        }
    }, [user, navigation]);

    if (!user) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur la page de tickets!</Text>
        </View>
    );
}