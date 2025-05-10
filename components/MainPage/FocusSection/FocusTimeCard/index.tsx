import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SPACING } from "@/styles/spacing";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { rgbaColor } from "@/feature/rgbaColor";

interface IProps {
    isFocus: boolean;
    isNotPassed?: boolean; // 경과 여부
    time: number; // 시간 값
    day: number; // 일 값
}

export default function FocusTimeCard(props: IProps) {
    const { isFocus, time, day, isNotPassed } = props;

    // timeCircle 스타일 동적 설정
    const timeCircleStyle = [
        styles.timeCircle,
        {
            backgroundColor: isNotPassed
                ? COLORS.text.forth // 경과 안 됨
                : time < 4
                    ? COLORS.brand_right.secondary // 4 미만
                    : time >= 4 && time < 8
                        ? COLORS.brand_right.primary // 4~8
                        : COLORS.brand_right.high, // 8 이상
        },
    ];

    return (
        <View style={isFocus ? styles.borderContainer : styles.container}>
            <View style={timeCircleStyle}>
                {/* isNotPassed가 false일 때만 시간 표시 */}
                {!isNotPassed && <Text style={styles.timeText}>{time}</Text>}
            </View>
            <Text style={styles.dayText}>{day}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 35,
        height: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 6,
        gap: SPACING.superTiny,
        color: COLORS.text.third,
    },
    borderContainer: {
        width: 45,
        height: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 6,
        gap: SPACING.superTiny,
        borderWidth: 1,
        borderColor: rgbaColor(COLORS.brand.primary, 50),
        color: COLORS.text.primary,
        borderRadius: SPACING.tiny,
    },
    timeCircle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    timeText: {
        color: COLORS.text.primary,
        fontWeight: "500",
        fontSize: FONTS.size.small,
    },
    dayText: {
        color: COLORS.text.third,
        fontSize: FONTS.size.small,
        fontWeight: "500",
    },
});