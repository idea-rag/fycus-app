import AISection from "@/components/MainPage/AISection";
import FocusSection from "@/components/MainPage/FocusSection";
import HardwareSection from "@/components/MainPage/HardwareSection";
import Header from "@/components/MainPage/Header";
import TaskSection from "@/components/MainPage/TaskSection";
import TimeSection from "@/components/MainPage/TimeSection";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
        <SafeAreaView style={styles.container}>
          <Header/>
          <CustomView width='100%' alignItems={'flex-start'} gap={SPACING.superTiny} paddingHorizontal={SPACING.medium}>
            <CustomText fontSize={FONTS.size.head} textColor={COLORS.text.primary}>
              안녕하세요 류한석님!
            </CustomText>
            <CustomText fontSize={FONTS.size.small} textColor={COLORS.text.third}>
              어제의 공부시간은 10시간이었어요, 오늘도 열심히 화이팅!
            </CustomText>
          </CustomView>
          <FocusSection/>
          <TaskSection/>
          <CustomView paddingVertical={SPACING.superTiny} paddingHorizontal={SPACING.medium} flexDirection={'row'} gap={SPACING.medium} alignItems={'flex-start' +
              ''} justifyContent={'space-between'}>
            <AISection/>
            <HardwareSection battery={70} connection={true}/>
          </CustomView>
          <TimeSection/>
        
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    gap: SPACING.medium,
    backgroundColor:'#fff'
  },
})