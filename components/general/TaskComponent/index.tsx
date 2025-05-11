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
                <Text style={{ color: checked ? COLORS.text.primary : COLORS.text.third , fontSize:FONTS.size.small}}>
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
        height: 30,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
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
