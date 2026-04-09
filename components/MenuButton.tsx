import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import {styles} from "../styles";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function MenuButton({ title, onPress, disabled = false }: Props) {
  if(disabled) {
    return (
      <Pressable style={[styles.menubutton, styles.disabled]} disabled>
        <Text style={styles.textbutton}>{title}</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable style={styles.menubutton} onPress={onPress}>
        <Text style={styles.textbutton}>{title}</Text>
      </Pressable>
    );
  }
}