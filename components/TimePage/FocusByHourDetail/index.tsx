import CustomView from "@/components/general/CustomView";
import HourSection from "@/components/TimePage/FocusByHourDetail/HourSection";
import { SPACING } from "@/styles/spacing";

export default function FocusByHourDetail() {
    return(
        <CustomView
            width={'100%'}
            paddingHorizontal={SPACING.medium}
            flexDirection={'column'}
            alignItems={'center'}
            gap={SPACING.medium}
            justifyContent={'center'}
            >
            <HourSection time={11}/> 
        </CustomView>
    )
}