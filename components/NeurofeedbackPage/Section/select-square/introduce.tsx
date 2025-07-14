import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

interface SelectSquareIntroduceProps {
    onStart?: () => void;
}

export default function SelectSquareIntroduce({ onStart }: SelectSquareIntroduceProps) {
    return (
        <CustomView
            width={'100%'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            paddingHorizontal={SPACING.medium}
            style={{flex : 1}}
            gap={SPACING.medium}
        >
            <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600}>2. select-square</CustomText>
            <CustomView>
            </CustomView>
            <CustomView
                alignItems={'flex-start'}  
                justifyContent={'flex-start'}
                width={'100%'}
            >
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600}>1. 사각형의 번호 순대로 누르시오.</CustomText>
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600}>2. 30개가 다 눌러서 사라지면 끝납니다.</CustomText>
            </CustomView>
            <CustomView
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <CustomButton
                    text="시작하기"
                    width={'100%'}
                    backgroundColor={COLORS.brand.primary}
                    textColor={COLORS.bng.primary}
                    textWeight={'700'}
                    fontSize={FONTS.size.small}
                    height={40}
                    onPress={onStart}
                />
            </CustomView>            
        </CustomView>
    )
}