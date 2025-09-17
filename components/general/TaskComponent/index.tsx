import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "@/styles/colors";
import {FONTS} from "@/styles/fonts";

interface Iprops {
    name: string;
    importance: number;
    isChecked: boolean;
    onChange?: (checked: boolean) => void;
}

export default function TaskComponent({ name, importance, isChecked, onChange }: Iprops) {
    const [checked, setChecked] = useState(isChecked);

    const toggleCheck = () => {
        const next = !checked;
        setChecked(next);
        onChange?.(next);
    };

    const getImportanceColor = () => {
        switch (importance) {
            case 3: return COLORS.brand.high;
            case 2: return COLORS.brand.primary;
            case 1: return COLORS.brand.secondary;
            default: return COLORS.text.forth;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <Pressable
                    onPress={toggleCheck}
                    style={[styles.checkBox, checked && styles.checkBoxChecked]}
                >
                    {checked && (
                        <MaterialIcons name="check" size={13} color={COLORS.bng.primary} />
                    )}
                </Pressable>
                <Text 
                    style={[
                        styles.taskText,
                        { color: checked ? COLORS.text.primary : COLORS.text.third },
                        { textDecorationLine: checked ? 'line-through' : 'none' }
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>
            </View>
            <Text style={{ color: getImportanceColor(), fontSize: FONTS.size.small}}>중요도 {importance}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 35,
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginRight: 10,
    },
    taskText: {
        flex: 1,
        color: COLORS.text.primary,
        fontSize: FONTS.size.small,
        flexWrap: 'wrap',
    },
    checkBox: {
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        backgroundColor: COLORS.text.forth,
    },
    checkBoxChecked: {
        backgroundColor: COLORS.brand.primary,
    },
});
