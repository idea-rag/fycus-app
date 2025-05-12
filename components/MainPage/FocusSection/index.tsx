import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SPACING } from "@/styles/spacing";
import FocusTimeCard from "@/components/MainPage/FocusSection/FocusTimeCard";
import SectionDefault from "../../general/SectionDefault";
import {navigate} from "expo-router/build/global-state/routing";

export default function FocusSection() {

    return (
        <SectionDefault
            title={"일주일간 집중내역"}
            titleLinkText={"자세히 보러가기"}
            onHandleLinkTextClick={() => navigate('/(tabs)/timePage')}>
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
        </SectionDefault>
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

