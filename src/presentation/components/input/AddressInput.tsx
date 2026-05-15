import React, {useRef, useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, TextInput, View,} from "react-native";

import {useInjection} from "../../hooks/ioc.react";
import {LocationFinder} from "../../../domain/core/services/LocationFinder";
import {colors} from "../../colors";
import {Location} from "../../../types/ScreenType";

export default function AddressInput({onSelect}: any) {
    const [value, setValue] = useState("");
    const [results, setResults] = useState<Location[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const locationFinder = useInjection<LocationFinder>(LocationFinder);

    const search = (text: string) => {
        setValue(text);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (text.length < 3) {
            setResults([]);
            return;
        }

        timeoutRef.current = setTimeout(async () => {
            try {
                const data = await locationFinder.findLocation(text);
                setResults(data ?? []);
            } catch (e) {
                console.error("AddressInput search error:", e);
            }
        }, 400);
    };

    const handleSelect = (location: Location) => {
        setValue(location.address);
        setResults([]);
        setIsFocused(false);

        onSelect(location);
    };

    const showDropdown = isFocused && results.length > 0;

    return (
        <View
            style={[
                localStyles.wrapper,
                showDropdown && {paddingBottom: 220},
            ]}
        >
            <TextInput
                value={value}
                onChangeText={search}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Rechercher une adresse"
                placeholderTextColor="rgba(255,255,255,0.45)"
                style={localStyles.input}
                autoCorrect={false}
                autoCapitalize="none"
            />

            {showDropdown && (
                <View style={localStyles.dropdown}>
                    <FlatList
                        data={results}
                        keyExtractor={(item) =>
                            `${item.lat}-${item.lon}-${item.address}`
                        }
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={false}
                        renderItem={({item, index}) => (
                            <Pressable
                                onPress={() => handleSelect(item)}
                                style={({pressed}) => [
                                    localStyles.item,
                                    index < results.length - 1 &&
                                    localStyles.itemBorder,
                                    pressed && localStyles.itemPressed,
                                ]}
                            >
                                <Text
                                    style={localStyles.itemText}
                                    numberOfLines={2}
                                >
                                    {item.address}
                                </Text>
                            </Pressable>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const localStyles = StyleSheet.create({
    wrapper: {
        position: "relative",
        zIndex: 10,
    },

    input: {
        color: colors.white,
        fontSize: 14,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },

    dropdown: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: "#1a3a6e",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
        zIndex: 100,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },

    item: {
        paddingHorizontal: 14,
        paddingVertical: 12,
    },

    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.08)",
    },

    itemPressed: {
        backgroundColor: "rgba(255,255,255,0.1)",
    },

    itemText: {
        color: colors.white,
        fontSize: 13,
        lineHeight: 18,
    },
});