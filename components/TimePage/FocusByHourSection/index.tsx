import CustomView from "@/components/general/CustomView";
import FocusByHourCard from "@/components/TimePage/FocusByHourSection/FocusByHourCard";
import { useStudyTimeStore } from "@/store/useStudyTime";
import { SPACING } from "@/styles/spacing";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function FocusByHourSection() {

    const {focusData} = useStudyTimeStore();
    const {totalFocusTime : focusTime, totalMeasureTime : studyTime} = focusData;
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
                {[8, 9, 10, 11, 12, 13, 14].map((hour) => {
                    const isCurrentHour = hour === 11; // Example: 11시가 현재 시간이라고 가정
                    const measureTime = isCurrentHour && typeof studyTime === 'number' ? studyTime / 60 : 0;
                    const focusTimeVal = isCurrentHour && typeof focusTime === 'number' ? focusTime / 60 : 0;
                    
                    return (
                        <FocusByHourCard 
                            key={hour}
                            hour={hour}
                            isFocused={isCurrentHour}
                            timeBarType={{ 
                                measureTime: Number.isNaN(measureTime) ? 0 : measureTime, 
                                focusTime: Number.isNaN(focusTimeVal) ? 0 : focusTimeVal 
                            }} 
                        />
                    );
                })}
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