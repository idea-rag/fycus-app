import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";

interface IProps {
    purpose : string,
    time : number,
}

export default function TimeCircle(props : IProps) {
    const {purpose, time} = props;
    if(purpose === '측정'){
        return (
            <CustomView
                width={100}
                height={100}
                borderRadius={100}
                alignItems={'center'}
                justifyContent={'center'}
                style={{backgroundColor : COLORS.text.forth}}
            >
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.third}>{purpose}</CustomText>
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.third}>{time}분</CustomText>
            </CustomView>
        )
    } else {
        return (
            <CustomView
                width={100}
                height={100}
                borderRadius={100}
                alignItems={'center'}
                justifyContent={'center'}
                style={{backgroundColor : COLORS.brand_right.high}}
            >
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.brand.primary} >{purpose}</CustomText>
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.brand.primary} >{time}분</CustomText>
            </CustomView>
        )
    }

}