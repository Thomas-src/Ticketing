import React, {useRef, useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/RootStackParamList';
import {CircleUserIcon} from "lucide-react-native";
import {colors} from "../../colors";
import UserRepositoryPocketBase from "../../../infrastructure/repository/UserRepositoryPocketBase";
import CreateUser from "../../../application/usecase/CreateUser";

type Props = NativeStackScreenProps<RootStackParamList>;

const repo = new UserRepositoryPocketBase();
const createUser = new CreateUser(repo);

export default function Signup({navigation}: Props) {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState<any>({});

    const nomRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const validate = () => {
        const newErrors: any = {};

        if (!prenom.trim()) newErrors.prenom = 'Prénom requis';
        if (!nom.trim()) newErrors.nom = 'Nom requis';

        if (!email.trim()) {
            newErrors.email = 'Email requis';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email invalide';
        }

        if (!password) {
            newErrors.password = 'Mot de passe requis';
        } else if (password.length < 8) {
            newErrors.password = 'Minimum 8 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            await createUser.execute(prenom, nom, email, password);

            navigation.reset({index: 0, routes: [{name: 'Settings'}]});
            navigation.getParent()?.navigate('Accueil');

        } catch (error) {
            Alert.alert('Erreur', 'Impossible de créer le compte');
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.flexGrow} keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <View style={styles.rectangle}>

                        <View style={styles.alignCenter}>
                            <CircleUserIcon color={colors.white}/>
                            <Text style={styles.rectangleTitle}>Inscription</Text>
                        </View>

                        <Text style={styles.label}>Prénom*</Text>
                        <TextInput
                            style={styles.input}
                            value={prenom}
                            onChangeText={(t) => {
                                setPrenom(t);
                                setErrors((e: any) => ({...e, prenom: null}));
                            }}
                            returnKeyType="next"
                            autoComplete="given-name"
                            textContentType="givenName"
                            onSubmitEditing={() => nomRef.current?.focus()}
                        />
                        {errors.prenom && (
                            <Text style={styles.colorRed}>{errors.prenom}</Text>
                        )}

                        <Text style={styles.label}>Nom*</Text>
                        <TextInput
                            ref={nomRef}
                            style={styles.input}
                            value={nom}
                            onChangeText={(t) => {
                                setNom(t);
                                setErrors((e: any) => ({...e, nom: null}));
                            }}
                            returnKeyType="next"
                            autoComplete="family-name"
                            textContentType="familyName"
                            onSubmitEditing={() => emailRef.current?.focus()}
                        />
                        {errors.nom && (
                            <Text style={styles.colorRed}>{errors.nom}</Text>
                        )}

                        <Text style={styles.label}>Adresse e-mail*</Text>
                        <TextInput
                            ref={emailRef}
                            style={styles.input}
                            value={email}
                            onChangeText={(t) => {
                                setEmail(t);
                                setErrors((e: any) => ({...e, email: null}));
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="email"
                            textContentType="emailAddress"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                        />
                        {errors.email && (
                            <Text style={styles.colorRed}>{errors.email}</Text>
                        )}

                        <Text style={styles.label}>Mot de passe*</Text>
                        <TextInput
                            ref={passwordRef}
                            style={styles.input}
                            value={password}
                            onChangeText={(t) => {
                                setPassword(t);
                                setErrors((e: any) => ({...e, password: null}));
                            }}
                            secureTextEntry
                            autoComplete="password"
                            textContentType="password"
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit}
                        />
                        {errors.password && (
                            <Text style={styles.colorRed}>{errors.password}</Text>
                        )}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>ENVOYER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>Connexion</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}