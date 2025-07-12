import ChartSection from "@/components/FocusPage/ChartSection";
import TimeSection from "@/components/FocusPage/TimeSection";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FocusPage() {
    
    return (
        <SafeAreaView style={styles.container}>
            <CustomView  flexDirection={"row"} alignItems={"center"}>
                <TouchableOpacity onPress={() => navigate("/(tabs)")}>
                    <MaterialIcons name={"keyboard-arrow-left"} color={"#000"} size={30} />
                </TouchableOpacity>
            </CustomView>
            <CustomView
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
            >
                <CustomText
                    fontSize={FONTS.size.head}
                    textColor={COLORS.text.primary}
                    fontWeight={600}
                >
                    현재 한석님의 상태는 
                </CustomText>
                <CustomText
                    fontSize={FONTS.size.head}
                    textColor={COLORS.text.primary}
                    fontWeight={600}
                >
                    집중 중입니다. 
                </CustomText>
            </CustomView>
            <ChartSection/>
            <TimeSection focusTime={120} measureTime={130}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: SPACING.huge,
        backgroundColor: "#fff",
        paddingHorizontal: SPACING.medium,
    },
});