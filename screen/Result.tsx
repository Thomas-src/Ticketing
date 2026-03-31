import { Text, View } from 'react-native';
import { styles } from '@/styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/RootStackParamList';
import { useEffect, useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function Result({ route }: Props) {
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Résultats de la partie</Text>
        </View>
    );
}

