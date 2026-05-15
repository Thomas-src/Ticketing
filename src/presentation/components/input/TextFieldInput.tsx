import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {colors} from '../../colors';

type Props = TextInputProps;

export default function TextFieldInput({style, ...props}: Props) {
    return (
        <TextInput
            placeholderTextColor="rgba(255,255,255,0.45)"
            style={[inputStyle, style]}
            {...props}
        />
    );
}

const inputStyle = {
    color: colors.white,
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
};