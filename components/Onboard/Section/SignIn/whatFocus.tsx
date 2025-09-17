import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useFormStore from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useState } from "react";
import { SafeAreaView, TextInput, StyleSheet } from "react-native";

interface IProps {
    onNext: () => void;
}

export default function WhatFocus(props: IProps) {
    const { onNext } = props;
    const [focusText, setFocusText] = useState('');
    //@ts-ignore
    const { submitFocusSubjectSetter } = useFormStore();

    const handleSubmit = () => {
        if (focusText.trim()) {
            submitFocusSubjectSetter(focusText);
            onNext();
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <CustomView
                style={{flex: 1}}
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.medium}
                flexDirection={'column'}
            >
                <CustomText 
                    fontSize={FONTS.size.title} 
                    fontWeight={500} 
                    textColor={COLORS.text.primary}
                    style={{textAlign: 'center', marginBottom: SPACING.medium}}
                >
                    어떤 부분에 집중하고 싶으신가요?
                </CustomText>
                
                <TextInput
                    style={styles.input}
                    onChangeText={setFocusText}
                    value={focusText}
                    placeholder="예: 수학 방정식, 영어 독해 등"
                    placeholderTextColor={COLORS.text.second}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="done"
                    autoFocus
                />

                <CustomButton
                    text="다음"
                    height={50}
                    width={200}
                    backgroundColor={COLORS.brand.primary}
                    textColor={'white'}
                    fontSize={FONTS.size.small}
                    textWeight={700}
                    onPress={handleSubmit}
                    style={{
                        opacity: focusText.trim() ? 1 : 0.5,
                        marginTop: SPACING.medium
                    }}
                />
            </CustomView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.bng.primary,
        borderRadius: 8,
        paddingHorizontal: SPACING.medium,
        fontSize: FONTS.size.small,
        color: COLORS.text.primary,
    },
});