import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

interface OrderActionIntroduceProps {
    onStart: () => void;
}

export default function OrderActionIntroduce({ onStart }: OrderActionIntroduceProps) {
    return (
        <CustomView
            width={'100%'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            paddingHorizontal={SPACING.medium}
            style={{flex : 1}}
            gap={SPACING.medium}
        >
            <CustomText>3. order-action</CustomText>
            <CustomView
                alignItems={'flex-start'}  
                justifyContent={'flex-start'}
                width={'100%'}
            >
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600}>1. 들려주는 지시사항을 들으시오.</CustomText>
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600}>2. 맞는 사진을 클릭하여 선택하시오.</CustomText>
            </CustomView>
            <CustomView
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <CustomButton
                    text="시작"
                    width={'100%'}
                    height={50}
                    style={{borderRadius : 12}}
                backgroundColor={COLORS.brand.primary}
                onPress={onStart}
            />
            </CustomView>
        </CustomView>
    )
}   