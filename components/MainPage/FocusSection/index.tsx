import { ScrollView, View, Text, StyleSheet } from "react-native";
import Button from "@/components/Button";
import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { FONTS } from "@/styles/fonts";
import FocusTimeCard from "@/components/MainPage/FocusSection/FocusTimeCard";

export default function FocusSection() {
    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <Text>일주일간 집중내역</Text>
                <Button
                    text={"자세히 보러가기"}
                    fontSize={FONTS.size.small}
                    textColor={COLORS.brand.high}
                    backgroundColor={"rgba(255, 255, 255, 0)"}
                />
            </View>

            {/* ✅ 가로 스크롤뷰 + 좌우 margin */}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: SPACING.superTiny,
        paddingHorizontal: SPACING.medium, // ✅ 좌우 16px padding
        display: "flex",
        gap: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    headContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: SPACING.superTiny,
    },
    focusTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.small,
    },
});
