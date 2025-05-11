import CustomView from "@/components/general/CustomView";
import {StyleSheet} from "react-native";
import TimeCard from "@/components/MainPage/TimeSection/TimeCard";
import {SPACING} from "@/styles/spacing";
import MeasureTimeButton from "@/components/general/MeasureTimeButton";

export default function TimeSection() {
    return (
        <CustomView width='100%' alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} paddingVertical={SPACING.small} paddingHorizontal={SPACING.superHuge}>
            <TimeCard time={120} timeType={'순수 집중시간'}/>
            <MeasureTimeButton/>
            <TimeCard time={130} timeType={'공부시간'}/>
        </CustomView>
    );
}

