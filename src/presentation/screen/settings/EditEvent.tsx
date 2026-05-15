import {StyleSheet, View,} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/RootStackParamList';
import {colors} from '../../colors';
import {ValidationError} from '../../../types/ScreenType';

type Props = NativeStackScreenProps<RootStackParamList, 'EditEvent'>;

type EventForm = {
    title: string;
    description: string;
    seats: string;
    tags: string[];
    startAt: Date;
    endAt: Date;
    addressName: string;
    address: string;
    image: string;
};

export function validateEvent(form: EventForm): ValidationError[] {
    const errors: ValidationError[] = [];

    if (form.title.trim().length < 5) {
        errors.push({field: "title", message: "Le titre doit contenir au moins 5 caractères."});
    }
    if (form.addressName.trim().length < 5) {
        errors.push({field: "addressName", message: "Le titre de l'adresse doit contenir au moins 5 caractères."});
    }
    if (form.image.trim().length == 0) {
        errors.push({field: "image", message: "Une image est obligatoire."});
    }
    if (form.description.trim().length < 10) {
        errors.push({field: "description", message: "La description doit contenir au moins 10 caractères."});
    }

    const seatsNum = parseInt(form.seats, 10);
    if (!form.seats || isNaN(seatsNum) || seatsNum < 1) {
        errors.push({field: "seats", message: "Le nombre de places doit être supérieur à 0."});
    }

    if (form.tags.length === 0) {
        errors.push({field: "tags", message: "Sélectionnez au moins un tag."});
    }

    if (form.endAt < form.startAt) {
        errors.push({field: "endAt", message: "La date de fin doit être après la date de début."});
    }

    if (!form.address.trim()) {
        errors.push({field: "address", message: "L'adresse est requise."});
    }

    return errors;
}

export default function EditEvent({navigation, route}: Props) {

    return (<View style={styles.container}>
        
    </View>)
}

const styles = StyleSheet.create({
    content: {
        padding: 16,
        gap: 20,
    },
    container: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        marginTop: 40,
        color: colors.black,
    },
    btn: {
        backgroundColor: colors.blue,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnText: {
        color: colors.white,
        fontWeight: '700',
    }
});