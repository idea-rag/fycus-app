import CustomView from "@/components/general/CustomView";
import {SPACING} from "@/styles/spacing";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";
import CustomInput from "@/components/general/CustomInput";
import CustomButton from "@/components/general/CustomButton";
import {COLORS} from "@/styles/colors";
import NextButton from "@/components/Onboard/NextButton";

export default function School() {
    return (
        <CustomView
            width={322}
            alignItems={'center'}
            justifyContent={'center'}
            gap={SPACING.medium}
            flexDirection={'column'}
        >
            <CustomText fontSize={FONTS.size.body}>다음으로, 학교와 학년을 선택해주세요.</CustomText>
            <CustomView
                alignItems={'center'}
                justifyContent={'flex-start'}
                flexDirection={'column'}
                gap={SPACING.superTiny}
            >
                <CustomText fontSize={FONTS.size.small}>학교</CustomText>
                <CustomInput placeholder={'학교를 입력하세요...'} width={'100%'}/>
            </CustomView>
            <CustomView
                alignItems={'center'}
                justifyContent={'flex-start'}
                flexDirection={'column'}
                gap={SPACING.superTiny}
            >
                <CustomText fontSize={FONTS.size.small}>학년</CustomText>
                <CustomInput placeholder={'학년을 선택하세요...'} width={'100%'}/>
            </CustomView>
            <NextButton/>
        </CustomView>
    )
}