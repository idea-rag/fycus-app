import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import TimeCircle from "@/components/TimePage/FocusByHourDetail/HourSection/timeCircle";
import useStudyTimeStore from "@/store/useStudyTime";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import React from "react";
import { StyleSheet } from "react-native";
import { CartesianChart, Line, Scatter } from "victory-native";

interface IProps {
    time: number,
}

export default function HourSection(props : IProps) {
    const {time} = props;
    const {focusTime, studyTime} = useStudyTimeStore();
    const data = [
        { time : 10, focusTime : 8},
        // { time : 20, focusTime : 23},
        // { time : 30, focusTime : 15},
        // { time : 40, focusTime : 18},
        // { time : 50, focusTime : 22},
        // { time : 60, focusTime : 25},
    ]

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
                height={200}
                flexDirection={'row'}
            >
                <CartesianChart
                    data={data}
                    xKey="time"
                    yKeys={["focusTime"]}
                    axisOptions={{
                        labelOffset : 30,
                        formatXLabel:  (value) => `${value}`,
                        formatYLabel: (value) => `${value}`,
                        labelColor: 'black',
                        tickCount: 5,
                    }}
                    domainPadding={{left : SPACING.medium, right : SPACING.medium, top : SPACING.medium, bottom : SPACING.medium}}
                    frame={{
                        lineWidth : 0,
                    }}
                >
                    {({ points, chartBounds }) => (
                        <>
                        <Line
                            points={points.focusTime}
                            color={COLORS.brand.primary}
                            strokeWidth={2}
                        />
                        <Scatter
                            points={points.focusTime}
                            color={COLORS.brand.primary}
                            radius={5}
                            style="fill"
                        />
                        </>
                    )}
                </CartesianChart>
            </CustomView>
            <CustomView
                justifyContent={'space-between'}
                alignItems={'center'}
                flexDirection={'row'}
                paddingHorizontal={40}
                width={'100%'}
            >
                <TimeCircle purpose={'측정'} time={Number((studyTime/60).toFixed(0))}/>
                <TimeCircle purpose={'집중'} time={Number((focusTime/60).toFixed(0))}/>
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