import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { TimeBar } from "@/components/TimePage/TimeBar";
import { TimeBarTypes } from "@/interface/TimeBarTypes";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { StyleSheet } from "react-native";

type TimeBarLimited = Pick<TimeBarTypes, "measureTime"  | "focusTime">;

interface IProps {
    hour : number,
    isFocused : boolean,
    timeBarType : TimeBarLimited
}

export default function FocusByHourCard(props: IProps) {
    const { hour, timeBarType , isFocused} = props;

    if (isFocused) {
        return (
            <CustomView
                alignItems={'center'}
                justifyContent={'flex-end'}
                paddingVertical={SPACING.superTiny}
                paddingHorizontal={SPACING.tiny}
                gap={SPACING.superTiny}
                width={45}
                height={85}
                borderRadius={SPACING.tiny}
                style={styles.containerBorder}
            >
                <TimeBar
                    width={14}
                    height={53}
                    isDetail={false}
                    focusTime={timeBarType.focusTime}
                    measureTime={timeBarType.measureTime}
                    maxTime={60}/>
                <CustomView style={{backgroundColor : COLORS.text.forth}} width={24} height={1}/>
                <CustomText
                    fontSize={FONTS.size.small}
                    textColor={COLORS.text.third}
                >{hour}시</CustomText>
            </CustomView>
        )
    } else {
        return (
            <CustomView
                alignItems={'center'}
                justifyContent={'flex-end'}
                paddingVertical={SPACING.superTiny}
                paddingHorizontal={SPACING.tiny}
                gap={SPACING.superTiny}
                width={40}
                height={85}
            >
                <TimeBar
                    width={14}
                    height={53}
                    isDetail={false}
                    focusTime={timeBarType.focusTime}
                    measureTime={timeBarType.measureTime}
                    maxTime={60}/>
                <CustomView style={{backgroundColor : COLORS.text.forth}} width={24} height={1}/>
                <CustomText
                    fontSize={FONTS.size.small}
                    textColor={COLORS.text.third}
                >{hour}시</CustomText>
            </CustomView>
        )
    }

}

const styles = StyleSheet.create({
    containerBorder : {
        borderColor: COLORS.brand_right.high,
        borderStyle: 'solid',
        borderWidth: 1
    }
})
