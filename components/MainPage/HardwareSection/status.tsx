import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Status({ connection} : {connection : boolean | undefined}) {
    return (
        <CustomView alignItems={'center'} justifyContent={'center'} flexDirection={'row'} gap={SPACING.tiny}>
            <CustomView flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={SPACING.superTiny}>
                <FontAwesome name={'link'} color={COLORS.text.third} size={12}/>
                {connection ?
                    <CustomText fontSize={FONTS.size.small} textColor={COLORS.state.correct}>
                        양호
                    </CustomText>
                    :
                    <CustomText fontSize={FONTS.size.small} textColor={COLORS.state.uncorrect}>
                        연결 X
                    </CustomText>
                }
            </CustomView>
        </CustomView>   
    )
}