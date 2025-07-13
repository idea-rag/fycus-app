import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

export default function FindDogIntroduce() {
    return (
        <CustomView
            width={'100%'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            paddingHorizontal={SPACING.medium}
            style={{flex : 1}}
        >
            <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600}>1. find-dog</CustomText>
            <CustomView>
            </CustomView>
            <CustomView
                flexDirection={'row'}
                alignItems={'center'}  
                justifyContent={'center'}
                width={'100%'}
            >
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600}>1. 화면에 나타나는 지시에 맞춰 그에 맞는 강아지를 찾으십시오.</CustomText>
            </CustomView>
            <CustomView>
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600}>2. 지시에 맞는 강아지를 클릭하여 선택하시오.</CustomText>
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
                    onPress={() => {}}
                />
            </CustomView>            
        </CustomView>
    )
}