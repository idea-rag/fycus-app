import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useFormStore from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

interface IProps {
    onNext: () => void;
}

export default function WhatFocus(props: IProps) {
    const { onNext } = props;
    const [selectedSubject, setSelectedSubject] = useState([]);
    //@ts-ignore
    const { submitSubjectModule, submitFocusSubjectSetter } = useFormStore();


    const handleSelectSubject = (subject : string) => {
        submitFocusSubjectSetter(subject);
        onNext();
    };

    useEffect(() => {
        const subjects = submitSubjectModule.map((item : {subject : string, publisher : string, work : string[]}) => item.subject);
        setSelectedSubject(subjects);
        console.log(subjects);
    }, []);

    return (
        <SafeAreaView
            style={{flex : 1}}
        >
            <CustomView
                style={{flex : 1}}
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.medium}
                flexDirection={'column'}
            >
                <CustomText fontSize={FONTS.size.title} fontWeight={500} textColor={COLORS.text.primary}>어느 과목에 더욱 집중하고 싶나요?</CustomText>
                <CustomView
                    flexDirection={'column'}
                    gap={SPACING.medium}
                >
                    {selectedSubject.map((item : string, index : number) => (
                        <CustomButton
                            key={index}
                            text={item}
                            height={40}
                            backgroundColor={COLORS.brand.primary}
                            textColor={'white'}
                            fontSize={FONTS.size.small}
                            textWeight={700}
                            style={{paddingHorizontal : SPACING.medium, paddingVertical : SPACING.small}}
                            onPress={() => handleSelectSubject(item)}
                        />
                    ))}
                </CustomView>
            </CustomView>
        </SafeAreaView>
    )
}