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
    whatDay: string;
    onChange?: (checked: boolean) => void;
}

export default function TaskComponent({ name, importance, isChecked, whatDay, onChange }: Iprops) {
    const [checked, setChecked] = useState(isChecked);
    const currentDate = new Date().toISOString().split('T')[0];
    const isToday = whatDay === currentDate;

    const toggleCheck = () => {
        if (!isToday) return;
        const next = !checked;
        setChecked(next);
        onChange?.(next);
    };

    const getImportanceColor = () => {
        if (!isToday) return COLORS.text.forth;
        switch (importance) {
            case 3: return COLORS.brand.high;
            case 2: return COLORS.brand.primary;
            case 1: return COLORS.brand.secondary;
            default: return COLORS.text.forth;
        }
    };

    return (
        <View style={[styles.container, !isToday && styles.disabledTask]}>
            <View style={styles.headContainer}>
                <Pressable
                    onPress={toggleCheck}
                    style={[
                        styles.checkBox, 
                        checked && styles.checkBoxChecked,
                        !isToday && styles.disabledCheckbox
                    ]}
                    disabled={!isToday}
                >
                    {checked && (
                        <MaterialIcons name="check" size={13} color={COLORS.brand.primary} />
                    )}
                </Pressable>
                <Text 
                    style={[
                        styles.taskText,
                        { 
                            color: !isToday 
                                ? COLORS.text.forth 
                                : checked 
                                    ? COLORS.text.primary 
                                    : COLORS.text.third,
                            textDecorationLine: checked ? 'line-through' : 'none'
                        }
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
        width: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: COLORS.brand.primary,
        backgroundColor: 'transparent',
    },
    checkBoxChecked: {
        backgroundColor: COLORS.brand.primary,
        borderColor: COLORS.brand.primary,
    },
    disabledTask: {
        opacity: 0.6,
    },
    disabledCheckbox: {
        backgroundColor: COLORS.text.forth,
        borderColor: COLORS.text.third,
        },
});
