import CustomView from "@/components/general/CustomView";
import MeasureTimeButton from "@/components/general/MeasureTimeButton";
import TimeCard from "@/components/MainPage/TimeSection/TimeCard";
import { SPACING } from "@/styles/spacing";
import { Platform, StyleSheet } from "react-native";

interface IProps {
    focusTime : number;
    studyTime : number;
}

export default function TimeSection(props : IProps) {
    const {focusTime, studyTime} = props;
    return (
        <CustomView width='100%' alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} paddingVertical={SPACING.small} paddingHorizontal={SPACING.superHuge} style={styles.container}>
            <TimeCard time={focusTime} timeType={'순수 집중시간'}/>
            <MeasureTimeButton/>
            <TimeCard time={studyTime} timeType={'공부시간'}/>
        </CustomView>
    );
}

const styles = StyleSheet.create({
    container: {    
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{ translateX: '-50%' }],
        width: '90%',
        backgroundColor: 'rgba(250, 250, 250, 0.9)',
        borderRadius: SPACING.medium,
        gap: SPACING.superHuge,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: SPACING.medium,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            },
            android: {
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
        }),
    },
});
