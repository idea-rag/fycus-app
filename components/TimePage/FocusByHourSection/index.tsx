import CustomView from "@/components/general/CustomView";
import FocusByHourCard from "@/components/TimePage/FocusByHourSection/FocusByHourCard";
import useStudyTimeStore from "@/store/useStudyTime";
import { SPACING } from "@/styles/spacing";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function FocusByHourSection() {

    const {focusTime, studyTime} = useStudyTimeStore();
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
                <FocusByHourCard hour={8} isFocused={false} timeBarType={{ measureTime: 0, focusTime: 0 }} />
                <FocusByHourCard hour={9} isFocused={false} timeBarType={{ measureTime: 0, focusTime: 0 }} />
                <FocusByHourCard hour={10} isFocused={false} timeBarType={{ measureTime: 0, focusTime: 0 }} />
                <FocusByHourCard hour={11} isFocused={true} timeBarType={{ measureTime: studyTime/60, focusTime: focusTime/60 }} />
                <FocusByHourCard hour={12} isFocused={false} timeBarType={{ measureTime: 0, focusTime: 0 }} />
                <FocusByHourCard hour={13} isFocused={false} timeBarType={{ measureTime: 0, focusTime: 0 }} />
                <FocusByHourCard hour={14} isFocused={false} timeBarType={{ measureTime: 0, focusTime: 0 }} />
            </ScrollView>
        </CustomView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 16, 
        gap: SPACING.small, 
    },
});