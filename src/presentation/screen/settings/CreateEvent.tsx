import {Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View,} from 'react-native';
import {useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/RootStackParamList';
import {useInjection} from '../../hooks/ioc.react';
import CreateNewEvent from '../../../application/usecase/CreateNewEvent';
import {colors} from '../../colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {CalendarDays, ChevronDown, Clock, FileText, ImageIcon, MapPin, TagIcon, Users} from 'lucide-react-native';
import {TagManager} from '../../../domain/core/services/TagManager';
import AddressInput from '../../components/input/AddressInput';
import TextFieldInput from '../../components/input/TextFieldInput';
import SectionCard from '../../components/layout/SectionCard';
import FieldRow from '../../components/input/FieldRow';
import {Location, ValidationError} from '../../../types/ScreenType';
import {Address} from "../../../domain/core/Address";
import {Event} from "../../../domain/core/Event";
import {Tag} from "../../../domain/core/Tag";

type Props = NativeStackScreenProps<RootStackParamList>;

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

export default function CreateEvent({navigation}: Props) {
    const createEvent = useInjection<CreateNewEvent>(CreateNewEvent);
    const tagManager = useInjection<TagManager>(TagManager);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string>("");
    const [imageName, setImageName] = useState<string | null>(null);
    const [seats, setSeats] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const [startAt, setStartAt] = useState(new Date());
    const [endAt, setEndAt] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const [addressName, setAddressName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [tagsLoaded, setTagsLoaded] = useState(false);
    const [showTagsDropdown, setShowTagsDropdown] = useState(false);

    const [errors, setErrors] = useState<ValidationError[]>([]);
    const getError = (field: string) => errors.find((e) => e.field === field)?.message;
    const clearError = (field: string) => setErrors((prev) => prev.filter((e) => e.field !== field));

    const handleSubmit = async () => {
        const validationErrors = validateEvent({
            title, description, seats, tags,
            startAt, endAt, addressName, address, image
        });

        if (validationErrors.length > 0) {
            console.log("errors", validationErrors)
            setErrors(validationErrors);
            return;
        }

        setErrors([]);
        console.log(addressName);
        const EventAddress = new Address(addressName, address, city)
        const EventTags: Tag[] = tags.map((tag) => new Tag(tag));
        const event = new Event("0", title, description, parseInt(seats, 10), startAt, endAt, image, EventTags, 10, EventAddress);
        try {
            console.log("creation event", event);
            const EventCreated = await createEvent.execute(event);
            console.log('Submit', {title, description, seats, tags, startAt, endAt, address, city});
            navigation.navigate("Details", {
                eventId: EventCreated.id
            })
        } catch (error) {
            console.log(error)
            setErrors([{field: "none", message: "Une erreur s'est produite, veuillez réassayer"}]);
        }
    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }
        clearError('image');
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageName(result.assets[0].fileName ?? '');
        }
    };

    const toggleTag = (selectedTag: string) => {
        setTags((prev) => prev.includes(selectedTag) ? prev.filter((t) => t !== selectedTag) : [...prev, selectedTag]);
        clearError('tags');
    };

    useEffect(() => {
        if (tagsLoaded) return;
        const loadTags = async () => {
            try {
                const allTags = await tagManager.getAllTags();
                if (allTags != null) {
                    setAvailableTags(allTags.map((t) => t.name));
                    setTagsLoaded(true);
                }
            } catch (error) {
                console.error('Erreur chargement tags:', error);
            }
        };
        loadTags();
    }, [tagsLoaded]);

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={pageStyles.scroll}
                contentContainerStyle={pageStyles.content}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={pageStyles.heading}>Nouvel évènement</Text>

                <SectionCard title="Informations générales">
                    <FieldRow icon={<FileText color={colors.white} size={16}/>} label="Titre" error={getError('title')}>
                        <TextFieldInput
                            placeholder="Nom de l'évènement"
                            value={title}
                            onChangeText={(v) => {
                                setTitle(v);
                                clearError('title');
                            }}
                        />
                    </FieldRow>

                    <FieldRow icon={<FileText color={colors.white} size={16}/>} label="Description"
                              error={getError('description')}>
                        <TextFieldInput
                            placeholder="Décrivez votre évènement…"
                            value={description}
                            onChangeText={(v) => {
                                setDescription(v);
                                clearError('description');
                            }}
                            multiline
                            style={{minHeight: 80, textAlignVertical: 'top'}}
                        />
                    </FieldRow>

                    <FieldRow icon={<ImageIcon color={colors.white} size={16}/>} label="Image"
                              error={getError('image')}>
                        <Pressable onPress={pickImage} style={pageStyles.imageBtn}>
                            <Text style={pageStyles.imageBtnText}>{image ? `✓ ${imageName}` : 'Sélectionner une image'}
                            </Text>
                        </Pressable>
                    </FieldRow>

                    <View style={pageStyles.row}>
                        <View style={{flex: 1}}>
                            <FieldRow icon={<Users color={colors.white} size={16}/>} label="Places"
                                      error={getError('seats')}>
                                <TextFieldInput
                                    placeholder="ex. 30"
                                    value={seats}
                                    onChangeText={(v) => {
                                        setSeats(v);
                                        clearError('seats');
                                    }}
                                    keyboardType="numeric"
                                />
                            </FieldRow>
                        </View>

                        <View style={{flex: 1}}>
                            <FieldRow icon={<TagIcon color={colors.white} size={16}/>} label="Tags"
                                      error={getError('tags')}>
                                <Pressable
                                    style={pageStyles.tagsBtn}
                                    onPress={() => setShowTagsDropdown((v) => !v)}
                                >
                                    <Text style={{color: colors.white, fontSize: 14, flex: 1}}>
                                        {tags.length > 0 ? tags.join(', ') : 'Sélectionner…'}
                                    </Text>
                                    <ChevronDown color={colors.white} size={16}/>
                                </Pressable>

                                {showTagsDropdown && (
                                    <View style={pageStyles.tagsDropdown}>
                                        {availableTags.map((tag) => {
                                            const isSelected = tags.includes(tag);
                                            return (
                                                <Pressable
                                                    key={tag}
                                                    onPress={() => toggleTag(tag)}
                                                    style={pageStyles.tagItem}
                                                >
                                                    <Text style={{
                                                        color: colors.white,
                                                        fontWeight: isSelected ? '700' : '400'
                                                    }}>
                                                        {tag}
                                                    </Text>
                                                    {isSelected && (
                                                        <Text style={{color: colors.white, fontWeight: '700'}}>✓</Text>
                                                    )}
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                )}
                            </FieldRow>
                        </View>
                    </View>
                </SectionCard>

                <SectionCard title="Quand ?">
                    <View style={pageStyles.row}>
                        <View style={{flex: 1}}>
                            <FieldRow icon={<CalendarDays color={colors.white} size={16}/>} label="Date début">
                                <Pressable onPress={() => setShowStartDatePicker(true)} style={pageStyles.dateBtn}>
                                    <Text style={{color: colors.white}}>{startAt.toLocaleDateString()}</Text>
                                </Pressable>
                            </FieldRow>
                        </View>
                        <View style={{flex: 1}}>
                            <FieldRow icon={<Clock color={colors.white} size={16}/>} label="Heure">
                                <Pressable onPress={() => setShowStartTimePicker(true)} style={pageStyles.dateBtn}>
                                    <Text style={{color: colors.white}}>
                                        {startAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                    </Text>
                                </Pressable>
                            </FieldRow>
                        </View>
                    </View>

                    <View style={pageStyles.row}>
                        <View style={{flex: 1}}>
                            <FieldRow icon={<CalendarDays color={colors.white} size={16}/>} label="Date fin"
                                      error={getError('endAt')}>
                                <Pressable onPress={() => setShowEndDatePicker(true)} style={pageStyles.dateBtn}>
                                    <Text style={{color: colors.white}}>{endAt.toLocaleDateString()}</Text>
                                </Pressable>
                            </FieldRow>
                        </View>
                        <View style={{flex: 1}}>
                            <FieldRow icon={<Clock color={colors.white} size={16}/>} label="Heure">
                                <Pressable onPress={() => setShowEndTimePicker(true)} style={pageStyles.dateBtn}>
                                    <Text style={{color: colors.white}}>
                                        {endAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                    </Text>
                                </Pressable>
                            </FieldRow>
                        </View>
                    </View>
                </SectionCard>

                <SectionCard title="Lieu" zIndex={10}>
                    <FieldRow icon={<MapPin color={colors.white} size={16}/>} label="Titre de l'adresse"
                              error={getError('addressName')}>
                        <TextFieldInput
                            placeholder="Stade, salle..."
                            value={addressName}
                            onChangeText={(v) => {
                                setAddressName(v);
                                clearError('addressName');
                            }}
                        />
                    </FieldRow>

                    <FieldRow elevated icon={<MapPin color={colors.white} size={16}/>} label="Adresse"
                              error={getError('address')}>
                        <AddressInput
                            onSelect={(place: Location) => {
                                setAddress(place.address);
                                setCity(place.city ?? '');
                                setAddressName(place.name);
                                clearError('address');
                            }}
                        />
                    </FieldRow>
                </SectionCard>

                <Pressable style={pageStyles.submitBtn} onPress={handleSubmit}>
                    <Text style={pageStyles.submitText}>Créer l'évènement</Text>
                </Pressable>

                {showStartDatePicker && (
                    <DateTimePicker
                        value={startAt} mode="date" display="default"
                        onChange={(_, date) => {
                            setShowStartDatePicker(false);
                            if (date) {
                                const u = new Date(startAt);
                                u.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                                setStartAt(u);
                            }
                        }}
                    />
                )}
                {showStartTimePicker && (
                    <DateTimePicker
                        value={startAt} mode="time" display="default"
                        onChange={(_, date) => {
                            setShowStartTimePicker(false);
                            if (date) {
                                const u = new Date(startAt);
                                u.setHours(date.getHours(), date.getMinutes());
                                setStartAt(u);
                            }
                        }}
                    />
                )}
                {showEndDatePicker && (
                    <DateTimePicker
                        value={endAt} mode="date" display="default"
                        onChange={(_, date) => {
                            setShowEndDatePicker(false);
                            if (date) {
                                const u = new Date(endAt);
                                u.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                                setEndAt(u);
                                clearError('endAt');
                            }
                        }}
                    />
                )}
                {showEndTimePicker && (
                    <DateTimePicker
                        value={endAt} mode="time" display="default"
                        onChange={(_, date) => {
                            setShowEndTimePicker(false);
                            if (date) {
                                const u = new Date(endAt);
                                u.setHours(date.getHours(), date.getMinutes());
                                setEndAt(u);
                                clearError('endAt');
                            }
                        }}
                    />
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const pageStyles = StyleSheet.create({
    scroll: {},
    content: {
        padding: 17,
        gap: 25,
        paddingBottom: 40,
    },
    heading: {
        fontSize: 28,
        fontWeight: '400',
        color: colors.black,
        marginTop: 50,
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    dateBtn: {
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    imageBtn: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    imageBtnText: {
        color: colors.white,
        fontSize: 14,
    },
    tagsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    tagsDropdown: {
        marginTop: 6,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        overflow: 'hidden',
    },
    tagItem: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.inactive,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    submitBtn: {
        backgroundColor: colors.blue,
        borderRadius: 10,
        padding: 14,
        alignItems: 'center',
    },
    submitText: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 16,
    },
});