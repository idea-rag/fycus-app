import CustomView from "@/components/general/CustomView";
import {SPACING} from "@/styles/spacing";
import CustomText from "@/components/general/CustomText";
import HourTimeCard from "@/components/TimePage/FocusByHourDetail/HourSection/hourTimeCard";
import {COLORS} from "@/styles/colors";
import {FONTS} from "@/styles/fonts";
import {StyleSheet} from "react-native";
import TimeCircle from "@/components/TimePage/FocusByHourDetail/HourSection/timeCircle";

interface IProps {
    time: number,
}

export default function HourSection(props : IProps) {
    const {time} = props;

    return (
        <CustomView
            paddingHorizontal={SPACING.small}
            paddingVertical={SPACING.medium}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={SPACING.medium}
            borderRadius={SPACING.tiny}
            style={styles.container}
        >
            <CustomText style={{width : '100%'}} textColor={COLORS.brand.primary} fontSize={FONTS.size.body}>{time}시</CustomText>
            <CustomView
                alignItems={'center'}
                justifyContent={'center'}
                width={'100%'}
                flexDirection={'row'}
            >
                <HourTimeCard whenTime={10}/>
                <HourTimeCard whenTime={20}/>
                <HourTimeCard whenTime={30}/>
                <HourTimeCard whenTime={40}/>
                <HourTimeCard whenTime={50}/>
                <HourTimeCard whenTime={60}/>
            </CustomView>
            <CustomView
                justifyContent={'space-between'}
                alignItems={'center'}
                flexDirection={'row'}
                paddingHorizontal={40}
                width={'100%'}
            >
                <TimeCircle purpose={'측정'} time={60}/>
                <TimeCircle purpose={'집중'} time={45}/>
            </CustomView>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: COLORS.brand.secondary,
    },
})