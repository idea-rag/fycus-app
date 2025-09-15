import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { timeConverting } from "@/feature/timeConverting";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

interface IProps {
    time : number, timeType : string
}

export default function TimeCard(props: IProps) {
    const { time, timeType } = props;
    const convertedTime = timeConverting(time);

    return (
        <CustomView alignItems={'center'} justifyContent={'center'} paddingVertical={SPACING.small} gap={SPACING.tiny}>
            <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.fifth} fontWeight={600} >{timeType}</CustomText>
            <CustomText fontSize={FONTS.size.huge} textColor={COLORS.text.primary} fontWeight={600}>{convertedTime}</CustomText>
        </CustomView>
    );
}