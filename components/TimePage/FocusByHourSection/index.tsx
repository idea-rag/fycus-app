import CustomView from "@/components/general/CustomView";
import FocusByHourCard from "@/components/TimePage/FocusByHourSection/FocusByHourCard";
import { useStudyTimeStore } from "@/store/useStudyTime";
import { SPACING } from "@/styles/spacing";
import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";

export default function FocusByHourSection() {

    const {focusData} = useStudyTimeStore();
    const {totalFocusTime: focusTime, totalMeasureTime: studyTime} = focusData;
    const scrollViewRef = useRef<ScrollView>(null);
    const { width: windowWidth } = useWindowDimensions();
    const cardWidth = 44; // FocusByHourCard의 너비 (스타일에 따라 조정 필요)
    const gap = SPACING.small; // 카드 사이의 간격

    useEffect(() => {
        const currentHour = new Date().getHours();
        const scrollPosition = (cardWidth + gap) * currentHour - (windowWidth / 2) + (cardWidth / 2);
        
        // 스크롤뷰가 마운트된 후에 스크롤 조정
        const timer = setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                x: scrollPosition,
                animated: true,
            });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <CustomView
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                snapToInterval={cardWidth + gap}
                decelerationRate="fast"
                snapToAlignment="center"
            >
                {[1,2,3,4,5,6,7,8, 9, 10, 11, 12, 13, 14,15,16,17,18,19,20,21,22,23].map((hour) => {
                    const isCurrentHour = hour === new Date().getHours(); // Example: 11시가 현재 시간이라고 가정
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
        paddingVertical: 10,
    },
});