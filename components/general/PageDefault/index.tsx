import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, TouchableOpacity} from "react-native";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import {FontAwesome, FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import {COLORS} from "@/styles/colors";
import {FONTS} from "@/styles/fonts";
import {SPACING} from "@/styles/spacing";
import {navigate} from "expo-router/build/global-state/routing";

interface IProps {
    title: string;
    children: any;
}

export default function PageDefault(props: IProps) {
    const {title, children} = props;


    return (
        <SafeAreaView style={styles.container}>
            <CustomView paddingHorizontal={SPACING.medium} flexDirection={"row"} alignItems={"center"}>
                <TouchableOpacity onPress={() => navigate("/(tabs)")}>
                    <MaterialIcons name={"keyboard-arrow-left"} color={"#000"} size={30} />
                </TouchableOpacity>
                <CustomText textColor={COLORS.text.primary} fontSize={FONTS.size.head} fontWeight={"500"}>{title}</CustomText>
            </CustomView>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: SPACING.medium,
        backgroundColor: "#fff",
    },
});