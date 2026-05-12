import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/RootStackParamList';
import {CircleUserIcon} from "lucide-react-native";
import {colors} from "../../colors";
import LoginUser from "../../../application/usecase/LoginUser";
import {useInjection} from "../../hooks/ioc.react";

type Props = NativeStackScreenProps<RootStackParamList>;


export default function Login({navigation}: Props) {
    const loginUser = useInjection<LoginUser>(LoginUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any>({});

    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const validate = () => {
        const newErrors: any = {};

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
            await loginUser.execute(email, password);

            navigation.reset({index: 0, routes: [{name: 'Settings'}]});
            navigation.getParent()?.navigate('Accueil');

        } catch (error) {
            const message = error instanceof Error ? error.message : "Une erreur est survenue";
            setErrors((prev: any) => ({...prev, other: message,}));
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
                            <Text style={styles.rectangleTitle}>Connexion</Text>
                        </View>

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

                        {errors.other && (
                            <Text style={styles.colorRed}>{errors.other}</Text>
                        )}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>ENVOYER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.link}>Inscription</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}