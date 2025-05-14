import CustomView from "@/components/general/CustomView";
import {TimeBar} from "@/components/TimePage/TimeBar";
import {COLORS} from "@/styles/colors";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";
import {SPACING} from "@/styles/spacing";

interface IProps {
    whenTime : number,
}

export default function HourTimeCard(props : IProps) {
    const {whenTime} = props;
    return (
        <CustomView
            alignItems={'center'}
            justifyContent={'center'}
        >
            <TimeBar width={18} height={136} isDetail={true} maxTime={10} focusTime={8} measureTime={10}/>
            <CustomView width={50} height={1} style={{backgroundColor : COLORS.text.third}}/>
            <CustomText textColor={COLORS.text.primary} fontSize={FONTS.size.small} style={{marginTop: SPACING.superTiny}}>{whenTime}분</CustomText>
        </CustomView>
    )
}