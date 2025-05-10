import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "@/styles/colors";

interface IProps {
    name: string;
    importance: number; // 1, 2, 3
    onChange: (e: any) => void;
}

export default function TODOComponent(props: IProps) {
    const { name, importance, onChange } = props;
    const [checked, setChecked] = useState(false);

    const toggleCheck = () => {
        setChecked(!checked);
        onChange(!checked);
    };

    const getImportanceColor = () => {
        switch (importance) {
            case 3:
                return COLORS.brand.high;
            case 2:
                return COLORS.brand.primary;
            case 1:
                return COLORS.brand.secondary;
            default:
                return COLORS.text.forth;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <Pressable
                    onPress={toggleCheck}
                    style={[
                        styles.checkBox,
                        checked && styles.checkBoxChecked
                    ]}
                >
                    {checked && (
                        <MaterialIcons name="check" size={13} color={COLORS.bng.primary} />
                    )}
                </Pressable>
                <Text style={{ color: checked ? COLORS.text.primary : COLORS.text.third }}>
                    {name}
                </Text>
            </View>
            <Text style={{ color: getImportanceColor() }}>{importance}</Text>
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
        borderWidth: 1,
        borderColor: COLORS.brand.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        backgroundColor: COLORS.bng.primary,
    },
    checkBoxChecked: {
        backgroundColor: COLORS.brand.primary,
    },
});
