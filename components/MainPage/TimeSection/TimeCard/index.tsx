import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";
import {COLORS} from "@/styles/colors";
import {SPACING} from "@/styles/spacing";
import {timeConverting} from "@/feature/timeConverting";

interface IProps {
    time : number, timeType : string
}

export default function TimeCard(props: IProps) {
    const { time, timeType } = props;
    const convertedTime = timeConverting(time);

    return (
        <CustomView alignItems={'center'} justifyContent={'center'} paddingVertical={SPACING.small} gap={SPACING.tiny}>
            <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.fifth} >{timeType}</CustomText>
            <CustomText fontSize={FONTS.size.huge} textColor={COLORS.text.primary} fontWeight={500}>{convertedTime}</CustomText>
        </CustomView>
    );
}