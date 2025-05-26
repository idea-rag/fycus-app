import CustomView from "@/components/general/CustomView";
import {MaterialIcons} from "@expo/vector-icons";
import {COLORS} from "@/styles/colors";
import {Pressable} from "react-native";
import {StyleSheet} from "react-native";
import {useState} from "react";
import CustomText from "@/components/general/CustomText";
import {SPACING} from "@/styles/spacing";

interface IProps {
    isChecked: boolean;
    onChange?: (checked: boolean) => void;
    name?: string;
    width?: number;
    height?: number;
}

export default function SelectCard(props: IProps) {
    const {isChecked, onChange, name, width, height} = props;
    const [checked, setChecked] = useState(isChecked);

    const toggleCheck = () => {
        const next = !checked;
        setChecked(next);
        onChange?.(next);
    };

    return (
        <CustomView
            width={ width ? width : 65}
            height={height ? height : 28}
            alignItems={'center'}
            justifyContent={'center'}
            paddingHorizontal={SPACING.small}
            paddingVertical={SPACING.superTiny}
            gap={SPACING.tiny}
            style={{
                borderRadius: SPACING.superTiny,
                borderWidth: 1,
                borderColor: 'rgba(54,54,54,0.1)',
                borderStyle: 'solid'}}
        >
            <Pressable
                onPress={toggleCheck}
                style={[styles.checkBox, checked && styles.checkBoxChecked]}
            >
                {checked && (
                    <MaterialIcons name="check" size={13} color={COLORS.bng.primary} />
                )}
            </Pressable>
            <CustomText>{name}</CustomText>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    checkBox: {
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SPACING.superTiny,
        backgroundColor: COLORS.text.forth,
    },
    checkBoxChecked: {
        backgroundColor: COLORS.brand.primary,
    },
})