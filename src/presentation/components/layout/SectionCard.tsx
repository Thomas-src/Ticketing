import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../colors';

type Props = {
    title: string;
    children: React.ReactNode;
    zIndex?: number;
};

export default function SectionCard({title, children, zIndex}: Props) {
    return (
        <View style={[styles.card, zIndex !== undefined && {zIndex}]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.body}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.lightBlue,
        borderRadius: 15,
        padding: 16,
        gap: 16,
    },
    title: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 4,
    },
    body: {gap: 14},
});