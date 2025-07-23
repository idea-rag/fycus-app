import AISection from "@/components/MainPage/AISection";
import FocusSection from "@/components/MainPage/FocusSection";
import HardwareSection from "@/components/MainPage/HardwareSection";
import Header from "@/components/MainPage/Header";
import TaskSection from "@/components/MainPage/TaskSection";
import TimeSection from "@/components/MainPage/TimeSection";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useFormStore from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {

  const yesterdayStudyTime = 0;
  //@ts-ignore
  const {submitName} = useFormStore();

  const focusTimeList = [{
    isFocus : false,
    time : 12,
    day : 3,
    isNotPassed : false
  },
  {
    isFocus : false,
    time : 10,
    day : 4,
    isNotPassed : false
  },
  {
    isFocus : false,
    time : 12,
    day : 5,
    isNotPassed : false
  },
  {
    isFocus : false,
    time : 12,
    day : 6,
    isNotPassed : false
  },
  {
    isFocus : false,
    time : 12,
    day : 7,
    isNotPassed : false
  },
  {
    isFocus : true,
    time : 0,
    day : 8,
    isNotPassed : false
  },
  {
    isFocus : false,
    time : 0,
    day : 9,
    isNotPassed : true
  }
]

const tasks = {
  
}

  return (
        <SafeAreaView style={styles.container}>
          <Header/>
          <CustomView width='100%' alignItems={'flex-start'} gap={SPACING.superTiny} paddingHorizontal={SPACING.medium}>
            <CustomText fontSize={FONTS.size.head} textColor={COLORS.text.primary}>
              안녕하세요 {submitName}님!
            </CustomText>
            <CustomText fontSize={FONTS.size.small} textColor={COLORS.text.third}>
              {yesterdayStudyTime ? "어제의 공부시간은 " + yesterdayStudyTime + "시간이었어요" : "아직 공부시간이 측정되지 않았어요"}, 오늘도 열심히 화이팅!
            </CustomText>
          </CustomView>
          <FocusSection focusTimeList={focusTimeList}/>
          <TaskSection tasks={tasks}/>
          <CustomView paddingVertical={SPACING.superTiny} paddingHorizontal={SPACING.medium} flexDirection={'row'} gap={SPACING.medium} alignItems={'flex-start' +
              ''} justifyContent={'space-between'}>
            <AISection simpleFeedback={'아직 피드백이 없어요!'}/>
            <HardwareSection battery={70} connection={true}/>
          </CustomView>
          <TimeSection focusTime={0} studyTime={0}/>
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