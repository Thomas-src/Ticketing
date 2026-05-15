import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from "../../colors";

type Props = { message?: string };

export default function FieldError({message}: Props) {
    if (!message) return null;
    return <Text style={styles.error}>⚠ {message}</Text>;
}

const styles = StyleSheet.create({
    error: {
        color: colors.red,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 2,
    },
});