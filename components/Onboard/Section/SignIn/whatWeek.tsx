import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useFormStore from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

interface IProps {
    onNext: () => void;
}

export default function WhatWeek(props : IProps) {
    const { onNext } = props;
    //@ts-ignore
    const { submitWhatWeekSetter } = useFormStore();

    const handleSelectWhatWeek = (whatWeek : number) => {
        submitWhatWeekSetter(whatWeek);
        onNext();
    };
    return (
        <CustomView
            style={{flex : 1}}
            alignItems={'center'}
            justifyContent={'center'}
            gap={SPACING.medium}
            flexDirection={'column'}
        >
            <CustomText fontSize={FONTS.size.title} fontWeight={500} textColor={COLORS.text.primary}>몇주간의 스케줄을 원하는가요?</CustomText>
            <CustomView
                flexDirection={'column'}
                gap={SPACING.medium}
            >
                {['1주', '2주', '3주', '4주'].map((item : string, index : number) => (
                    <CustomButton
                        key={index}
                        text={item}
                        height={40}
                        backgroundColor={COLORS.brand.primary}
                        textColor={'white'}
                        fontSize={FONTS.size.small}
                        textWeight={700}
                        style={{paddingHorizontal : SPACING.medium, paddingVertical : SPACING.small}}
                        onPress={() => handleSelectWhatWeek(index + 1)}
                    />
                ))}
            </CustomView>
        </CustomView>
    )
}