import AISection from "@/components/MainPage/AISection";
import FocusSection from "@/components/MainPage/FocusSection";
import HardwareSection from "@/components/MainPage/HardwareSection";
import Hero from "@/components/MainPage/Hero";
import TaskSection from "@/components/MainPage/TaskSection";
import TimeSection from "@/components/MainPage/TimeSection";
import CustomButton from "@/components/general/CustomButton";
import CustomView from "@/components/general/CustomView";
import { MonthTasks } from "@/data/scehdule";
import useBLE from "@/feature/useBLE";
import ApiClient from "@/http/https";
import useFormStore from "@/store/useForm";
import useStudyTimeStore from "@/store/useStudyTime";
import { useTokenStore } from "@/store/useToken";
import { SPACING } from "@/styles/spacing";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useBeforeStore } from "@/store/useBeforeStore";
import FeedbackSelectModal from "@/components/MainPage/FeedbackSelectModal";
import useScheduleStore from "@/store/useSchedule";

export default function HomePage() {
  const router = useRouter();
  
  const yesterdayStudyTime = 0;
  //@ts-ignore
  const {previousPath, setPreviousPath} = useBeforeStore();
  const {studyTime, focusTime} = useStudyTimeStore();
  const { connectedDevice } = useBLE();
  const { schedule } = useScheduleStore();
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = schedule[today] || [];

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
    time : studyTime,
    day : 9,
    isNotPassed : true
  }
]

const tasks = MonthTasks['2025-07-24'];

const [isRegistering, setIsRegistering] = useState(false);
const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Initialize API client
    //@ts-ignore
    const {submitEmail, submitPassword, submitNameSetter, submitName, submitGmailSetter, submitPasswordSetter, submitSchoolSetter, submitGradeSetter, submitSubjectModuleSetter, submitFocusSubjectSetter, submitWhatWeekSetter } = useFormStore();
    const apiClient = new ApiClient(process.env.EXPO_PUBLIC_API_URL);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  }

  const handleModalOpen = () => {
    setIsModalVisible(true);
  }

  const handleNavigateToFeedback = () => {
    router.push('/(tabs)/AIPage');
    setIsModalVisible(false);
  } 

  useEffect(() => {
    console.log('이전 경로 확인:', previousPath);
    if (previousPath && previousPath.includes('FocusPage')) {
      console.log('모달 표시');
      setIsModalVisible(true);
      setPreviousPath('');
    }
  }, [previousPath]);

  const handleLogin = async () => {
    try {
      const response = await apiClient.login({
        userID: 'skyle@gmail.com',
        password: 'asdfasdf',
      });
      
      console.log('Login successful:', response);
      
      // Save access token to AsyncStorage
      if (response.access_token) {
        useTokenStore.setState({ token: response.access_token });
        console.log('Access token saved to AsyncStorage');
      }

      
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인해주세요.');
    }
  }

  const handleStoreSave = () => {
    submitNameSetter("류한석");
    submitGmailSetter("skyle@gmail.com");
    submitPasswordSetter("asdfasdf");
    submitSchoolSetter("선릴중학교");
    submitGradeSetter("middleschool-2");
    submitSubjectModuleSetter([
      {
        "subject": "국어",
        "publisher": "미래엔 (MiraeN)",
        "work": [
          "동백꽃",
          "석시조 세 편",
          "새해"
        ]
      },
      {
        "subject": "영어",
        "publisher": "천재교육 (Chunjae Education)",
        "work": [
          "The Most Precious Thing",
          "The Food Festival",
          "My School Life"
        ]
      }
    ]);
    submitFocusSubjectSetter("국어 동백꽃에 집중하고 싶어");
    submitWhatWeekSetter(1);
    Alert.alert('저장 완료', 'store에 저장되었습니다.');
  }

  return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}>
          <Hero name={submitName} time={yesterdayStudyTime}/>
          <CustomButton
            text={'로그인'}
            width={'100%'}
            onPress={handleLogin}
          />
          <CustomButton
            text={'회원가입'}
            width={'100%'}
            onPress={() => {
              router.push('/onboard');
            }}
          />
          <CustomButton
            text={'store에 저장하기'}
            width={'100%'}
            onPress={handleStoreSave}
          />
          <CustomView width='100%' alignItems={'flex-start'} gap={SPACING.medium} paddingHorizontal={SPACING.medium}>
            <FocusSection focusTimeList={focusTimeList}/>
            <TaskSection tasks={{
              [today]: todayTasks.map((task) => ({
                ...task,
                whatDay: today
              }))
            }} />
            <AISection simpleFeedback={'아직 피드백이 없어요!'}/>
            <HardwareSection battery={70} connection={!!connectedDevice}/>
          </CustomView>
          <CustomView height={140}/>
          </ScrollView>
          <TimeSection focusTime={focusTime} studyTime={studyTime}/>
          <FeedbackSelectModal
            visible={isModalVisible}
            onClose={handleModalClose}
            onNavigateToFeedback={handleNavigateToFeedback}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    gap: SPACING.medium,
    backgroundColor:'#F7F7F7'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  contentContainerStyle: {
    gap: SPACING.medium,
  },
})