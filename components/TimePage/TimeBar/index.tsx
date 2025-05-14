import { View, Text } from "react-native";
import CustomView from "@/components/general/CustomView";
import {StyleSheet} from "react-native";
import {COLORS} from "@/styles/colors";
import CustomText from "@/components/general/CustomText";
import {TimeBarTypes} from "@/interface/TimeBarTypes";

export function TimeBar(props: TimeBarTypes) {
    const { width, height, isDetail, focusTime, measureTime, maxTime} = props;

    const convertTimeHeight = (time: number) => {
        const ratio = height / maxTime;
        return ratio * time;
    }
    const focusTimeHeight = convertTimeHeight(focusTime);
    const measureTimeHeight = convertTimeHeight(measureTime);


    return (
        <>
            {isDetail ? (
                <CustomView width={width} style={styles.container} >
                    <CustomView alignItems={'center'} justifyContent={'flex-end'} gap={2} style={styles.measureContainer}>
                        <CustomText textColor={COLORS.brand_right.high} fontSize={6}>{measureTime}</CustomText>
                        <CustomView width={width} style={{backgroundColor: COLORS.brand_right.high,
                            borderTopLeftRadius : width/3,
                            borderTopRightRadius : width/3
                        }} height={measureTimeHeight}/>
                    </CustomView>
                    <CustomView alignItems={'center'} justifyContent={'flex-end'} gap={2} style={styles.focusContainer}>
                        <CustomText textColor={COLORS.brand.primary} fontSize={6}>{focusTime}</CustomText>
                        <CustomView width={width} style={{backgroundColor: COLORS.brand.primary,
                            borderTopLeftRadius : width/3,
                            borderTopRightRadius : width/3
                        }} height={focusTimeHeight}/>
                    </CustomView>
                </CustomView>
            ) : (
                <CustomView width={width} style={styles.container} >
                    <CustomView alignItems={'center'} justifyContent={'flex-end'} gap={2} style={styles.measureContainer}>
                        <CustomView width={width} style={{backgroundColor: COLORS.brand_right.high,
                            borderTopLeftRadius : width/3,
                            borderTopRightRadius : width/3,
                        }} height={measureTimeHeight}/>
                    </CustomView>
                    <CustomView alignItems={'center'} justifyContent={'flex-end'} gap={2} style={styles.focusContainer}>
                        <CustomView width={width} style={{backgroundColor: COLORS.brand.primary,
                            borderTopLeftRadius : width/3,
                            borderTopRightRadius : width/3
                        }} height={focusTimeHeight}/>
                    </CustomView>
                </CustomView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    measureContainer: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    focusContainer: {
        position: 'absolute',
        bottom: 0,
    }
})