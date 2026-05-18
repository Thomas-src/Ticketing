import React, {useCallback, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AccountStackParamList} from '../../../types/RootStackParamList';
import {CircleUserIcon} from "lucide-react-native";
import {colors} from "../../colors";
import {useInjection} from "../../hooks/ioc.react";
import CreateUser from "../../../application/usecase/CreateUser";

type Props = NativeStackScreenProps<AccountStackParamList>;

export default function Signup({navigation}: Props) {
    const createUser = useInjection<CreateUser>(CreateUser);

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState<any>({});

    const prenomRef = useRef<TextInput>(null);
    const nomRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const validate = useCallback(() => {
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
    }, [prenom, nom, email, password]);

    const handleSubmit = useCallback(async () => {
        if (!validate()) return;

        try {
            await createUser.execute(prenom, nom, email, password);
            navigation.reset({index: 0, routes: [{name: 'Settings'}]});
            navigation.getParent()?.navigate('Accueil');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Une erreur est survenue";
            setErrors((prev: any) => ({...prev, other: message}));
            console.error(error);
        }
    }, [validate, createUser, prenom, nom, email, password, navigation]);

    const handlePrenomChange = useCallback((t: string) => {
        setPrenom(t);
        setErrors((e: any) => ({...e, prenom: null}));
    }, []);

    const handleNomChange = useCallback((t: string) => {
        setNom(t);
        setErrors((e: any) => ({...e, nom: null}));
    }, []);

    const handleEmailChange = useCallback((t: string) => {
        setEmail(t);
        setErrors((e: any) => ({...e, email: null}));
    }, []);

    const handlePasswordChange = useCallback((t: string) => {
        setPassword(t);
        setErrors((e: any) => ({...e, password: null}));
    }, []);

    const focusPrenom = useCallback(() => prenomRef.current?.focus(), []);
    const focusNom = useCallback(() => nomRef.current?.focus(), []);
    const focusEmail = useCallback(() => emailRef.current?.focus(), []);
    const focusPassword = useCallback(() => passwordRef.current?.focus(), []);

    const navigateToLogin = useCallback(() => navigation.navigate('Login'), [navigation]);

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
                            onChangeText={handlePrenomChange}
                            returnKeyType="next"
                            autoComplete="given-name"
                            textContentType="givenName"
                            onSubmitEditing={focusPrenom}
                        />
                        {errors.prenom && (
                            <Text style={styles.colorRed}>{errors.prenom}</Text>
                        )}

                        <Text style={styles.label}>Nom*</Text>
                        <TextInput
                            ref={nomRef}
                            style={styles.input}
                            value={nom}
                            onChangeText={handleNomChange}
                            returnKeyType="next"
                            autoComplete="family-name"
                            textContentType="familyName"
                            onSubmitEditing={focusNom}
                        />
                        {errors.nom && (
                            <Text style={styles.colorRed}>{errors.nom}</Text>
                        )}

                        <Text style={styles.label}>Adresse e-mail*</Text>
                        <TextInput
                            ref={emailRef}
                            style={styles.input}
                            value={email}
                            onChangeText={handleEmailChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="email"
                            textContentType="emailAddress"
                            returnKeyType="next"
                            onSubmitEditing={focusEmail}
                        />
                        {errors.email && (
                            <Text style={styles.colorRed}>{errors.email}</Text>
                        )}

                        <Text style={styles.label}>Mot de passe*</Text>
                        <TextInput
                            ref={passwordRef}
                            style={styles.input}
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry
                            autoComplete="password"
                            textContentType="password"
                            returnKeyType="done"
                            onSubmitEditing={focusPassword}
                        />
                        {errors.password && (
                            <Text style={styles.colorRed}>{errors.password}</Text>
                        )}

                        {errors.other && (
                            <Text style={styles.colorRed}>{errors.other}</Text>
                        )}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>ENVOYER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToLogin}>
                            <Text style={styles.link}>Connexion</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}