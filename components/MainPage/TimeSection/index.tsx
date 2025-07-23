import CustomView from "@/components/general/CustomView";
import MeasureTimeButton from "@/components/general/MeasureTimeButton";
import TimeCard from "@/components/MainPage/TimeSection/TimeCard";
import { SPACING } from "@/styles/spacing";

interface IProps {
    focusTime : number;
    studyTime : number;
}

export default function TimeSection(props : IProps) {
    const {focusTime, studyTime} = props;
    return (
        <CustomView width='100%' alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} paddingVertical={SPACING.small} paddingHorizontal={SPACING.superHuge}>
            <TimeCard time={focusTime} timeType={'순수 집중시간'}/>
            <MeasureTimeButton/>
            <TimeCard time={studyTime} timeType={'공부시간'}/>
        </CustomView>
    );
}

