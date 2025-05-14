import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomView from "@/components/general/CustomView";
import FocusByHourCard from "@/components/TimePage/FocusByHourSection/FocusByHourCard";
import { SPACING } from "@/styles/spacing";

export default function FocusByHourSection() {
    return (
        <CustomView
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <FocusByHourCard hour={8} isFocused={false} timeBarType={{ measureTime: 60, focusTime: 45 }} />
                <FocusByHourCard hour={8} isFocused={false} timeBarType={{ measureTime: 60, focusTime: 45 }} />
                <FocusByHourCard hour={8} isFocused={false} timeBarType={{ measureTime: 60, focusTime: 45 }} />
                <FocusByHourCard hour={8} isFocused={true} timeBarType={{ measureTime: 60, focusTime: 45 }} />
                <FocusByHourCard hour={8} isFocused={false} timeBarType={{ measureTime: 60, focusTime: 45 }} />
                <FocusByHourCard hour={8} isFocused={false} timeBarType={{ measureTime: 60, focusTime: 45 }} />
                <FocusByHourCard hour={8} isFocused={false} timeBarType={{ measureTime: 60, focusTime: 45 }} />
                <FocusByHourCard hour={8} isFocused={false} timeBarType={{ measureTime: 60, focusTime: 45 }} />
            </ScrollView>
        </CustomView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 16, // 상위 padding 값에 맞게 조정
        gap: SPACING.small, // 카드 간격
    },
});