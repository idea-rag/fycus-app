import AISection from "@/components/MainPage/AISection";
import FocusSection from "@/components/MainPage/FocusSection";
import HardwareSection from "@/components/MainPage/HardwareSection";
import Header from "@/components/MainPage/Header";
import TaskSection from "@/components/MainPage/TaskSection";
import TimeSection from "@/components/MainPage/TimeSection";
import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { MonthTasks } from "@/data/scehdule";
import useBLE from "@/feature/useBLE";
import useFormStore from "@/store/useForm";
import useStudyTimeStore from "@/store/useStudyTime";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import ApiClient from "@/http/https";
import {Alert} from "react-native";
import { useTokenStore } from "@/store/useToken";
import { router } from "expo-router";

export default function HomePage() {

  const yesterdayStudyTime = 0;
  //@ts-ignore
  const {studyTime, focusTime} = useStudyTimeStore();
  const { connectedDevice } = useBLE();

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
    const {submitEmail, submitPassword, submitName} = useFormStore();
    const apiClient = new ApiClient(process.env.EXPO_PUBLIC_API_URL);

    // Get form data from store
    // const formData = {
    //     submitName: submitName,
    //     submitSchool: submitSchool,
    //     submitGrade: submitGrade,
    //     submitEmail: submitGmail,
    //     submitPassword: submitPassword,
    //     submitSubjectModule: submitSubjectModule,
    //     submitWhatFocus: submitFocusSubject,
    //     submitWhatWeek: submitWhatWeek,
    // };

  //   const handleRegister = async () => {
  //     // Validate required fields
  //     if (!formData.submitName || !formData.submitEmail || !formData.submitPassword) {
  //         Alert.alert('오류', '필수 정보가 누락되었습니다.');
  //         return;
  //     }
  
  //     setIsRegistering(true);
  //     setErrorMsg(null);
  
  //     console.log('API URL:', process.env.EXPO_PUBLIC_API_URL);
  
  //     try {
  //         // Subject_Module 데이터를 안전하게 처리
  //         const safeSubjectModule = (formData.submitSubjectModule || []).map((item: any) => ({
  //             subject: item.subject || '',
  //             publisher: item.publisher || '',
  //             work: Array.isArray(item.work) ? [...item.work] : []
  //         }));
  
  //         console.log('안전하게 처리된 Subject_Module:', JSON.stringify(safeSubjectModule, null, 2));
  
  //         const registrationData = {
  //             userID: formData.submitEmail,
  //             name: formData.submitName,
  //             school: formData.submitSchool || '선릴중학교',
  //             grade: String(formData.submitGrade) || '2',
  //             email: formData.submitEmail,
  //             password: formData.submitPassword,
  //             //@ts-ignore
  //             subject_name: safeSubjectModule.map(item => item.subject),
  //             //@ts-ignore
  //             subject_publish: safeSubjectModule.map(item => item.publisher),
  //             //@ts-ignore
  //             subject_BookList: safeSubjectModule.flatMap(item => item.work),
  //             focus_Grade: [String(formData.submitGrade)],
  //             Subject_Module: safeSubjectModule,
  //             Focus_Subject: formData.submitWhatFocus || '국어',
  //             WhatWeek: formData.submitWhatWeek || '1주'
  //         };
  
  //         console.log('전송할 registration data:', JSON.stringify(registrationData, null, 2));
          
  //         // API URL이 있는지 확인
  //         if (!process.env.EXPO_PUBLIC_API_URL) {
  //             throw new Error('API URL이 설정되지 않았습니다.');
  //         }
          
  //         // Call the register API
  //         const response = await apiClient.register(registrationData);
          
  //         console.log('Registration successful:', response);
  //         Alert.alert('성공', '회원가입이 완료되었습니다!');
          
  //     } catch (error: any) {
  //         console.error('회원가입 오류:', error);
          
  //         let errorMessage = '회원가입 중 오류가 발생했습니다.';
          
  //         if (error.response) {
  //             // 서버에서 응답이 온 경우
  //             console.error('Response data:', error.response.data);
  //             console.error('Response status:', error.response.status);
  //             console.error('Response headers:', error.response.headers);
              
  //             if (error.response.status === 400) {
  //                 errorMessage = '입력 정보를 확인해주세요.';
  //             } else if (error.response.status === 409) {
  //                 errorMessage = '이미 존재하는 사용자입니다.';
  //             } else if (error.response.status >= 500) {
  //                 errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  //             }
              
  //             // 서버에서 구체적인 오류 메시지를 보낸 경우
  //             if (error.response.data && error.response.data.message) {
  //                 errorMessage = error.response.data.message;
  //             }
  //         } else if (error.request) {
  //             // 네트워크 오류
  //             console.error('Network error - No response received:', error.request);
  //             errorMessage = '네트워크 연결을 확인해주세요.';
  //         } else {
  //             // 기타 오류
  //             console.error('Error message:', error.message);
  //             if (error.message.includes('API URL')) {
  //                 errorMessage = 'API 서버 설정에 문제가 있습니다.';
  //             }
  //         }
          
  //         setErrorMsg(errorMessage);
  //         Alert.alert('오류', errorMessage);
  //     } finally {
  //         setIsRegistering(false);
  //     }
  // };

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

  return (
        <SafeAreaView style={styles.container}>
          <Header/>
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
            <HardwareSection battery={70} connection={!!connectedDevice}/>
          </CustomView>
          <TimeSection focusTime={focusTime} studyTime={studyTime}/>
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