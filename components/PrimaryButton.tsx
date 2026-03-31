import { Pressable, Text } from 'react-native';
import { styles } from '@/styles/styles';
type Props = {
    title: string;
    onPress: () => void;
}

export default function PrimaryButton({title, onPress}: Props) {
    return ( 
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
     );
}