import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";


export default function Start() {

    return (
        <CustomView
        width={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        paddingHorizontal={SPACING.medium}
        style={{flex : 1}}
    >
        <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600} >
            지금부터, 집중력 향상 훈련을 시작하겠습니다.
        </CustomText>
    </CustomView>
    )
}   