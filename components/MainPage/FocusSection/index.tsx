import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SPACING } from "@/styles/spacing";
import FocusTimeCard from "@/components/MainPage/FocusSection/FocusTimeCard";
import DefaultSection from "@/components/DefaultSection";

export default function FocusSection() {
    return (
        <DefaultSection title={"일주일간 집중내역"} titleLinkText={"자세히 보러가기"}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.focusTimeContainer}
            >
                <FocusTimeCard isFocus={false} time={12} day={8} />
                <FocusTimeCard isFocus={false} time={12} day={8} />
                <FocusTimeCard isFocus={false} time={12} day={8} />
                <FocusTimeCard isFocus={true} time={12} day={8} />
                <FocusTimeCard isFocus={false} time={12} day={8} isNotPassed={true} />
                <FocusTimeCard isFocus={false} time={12} day={8} isNotPassed={true} />
                <FocusTimeCard isFocus={false} time={12} day={8} isNotPassed={true} />
            </ScrollView>
        </DefaultSection>
    );
}

const styles = StyleSheet.create({
    focusTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.small,
    },
});

