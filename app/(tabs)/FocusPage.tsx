// FocusPage.tsx (전체 코드)

import ChartSection from "@/components/FocusPage/ChartSection";
import TimeSection from "@/components/FocusPage/TimeSection";
import CustomScrollView from "@/components/general/CustomScrollView";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useBLE from "@/feature/useBLE";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function FocusPage() {
  const {
    receivedData,
  } = useBLE();

  const [attention, setAttention] = useState(0);
  const [meditation, setMeditation] = useState(0);
  const [variance, setVariance] = useState(0);


  useEffect(() => {
    if (receivedData) {
      const parts = receivedData.trim().split('/');
      if (parts.length === 3) {
        const att = parseInt(parts[0], 10);
        const med = parseInt(parts[1], 10);
        const vari = parseInt(parts[2], 10);

        if (!isNaN(att) && !isNaN(med) && !isNaN(vari)) {
          setAttention(att);
          setMeditation(med);
          setVariance(vari);
        }
      }
    }
  }, [receivedData]);
    
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
            <CustomScrollView
                width={'100%'}
                height={100}
                gap={SPACING.medium}
            >
                <CustomText
                    fontSize={16}
                    textColor={COLORS.text.primary}
                    fontWeight={500}
                >
                <CustomText>Attention: {attention}</CustomText>
                <CustomText>Meditation: {meditation}</CustomText>
                <CustomText>Variance: {variance}</CustomText>
                </CustomText>
            </CustomScrollView>
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