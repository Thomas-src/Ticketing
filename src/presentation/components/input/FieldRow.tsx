import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../colors';
import FieldError from './FieldError';

type Props = {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
    elevated?: boolean;
    error?: string;
};

export default function FieldRow({icon, label, children, elevated, error}: Props) {
    return (
        <View style={[styles.row, elevated && {zIndex: 20}]}>
            <View style={styles.iconLabel}>
                {icon}
                <Text style={styles.label}>{label}</Text>
            </View>
            <View style={[
                styles.inputWrap,
                elevated && {overflow: 'visible'},
                error ? styles.inputWrapError : null,
            ]}>
                {children}
            </View>
            <FieldError message={error}/>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {gap: 6},
    iconLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    label: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 14,
    },
    inputWrap: {
        backgroundColor: "transparent",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.inactive,
        overflow: 'hidden',
    },
    inputWrapError: {
        borderColor: colors.red,
    },
});