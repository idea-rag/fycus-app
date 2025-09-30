import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
import ApiClient from '@/http/https';
import { useTokenStore } from '@/store/useToken';
import useFormStore from '@/store/useForm';
import convertScheduleStruct from '@/feature/convertScheduleStruct';
import { COLORS } from '@/styles/colors';
import { FONTS } from '@/styles/fonts';
import { SPACING } from '@/styles/spacing';
import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import PageDefault from "@/components/general/PageDefault";
import SectionDefault from "@/components/general/SectionDefault";
import NavBar from "@/components/general/NavBar";
import CustomImage from '@/components/general/CustomImage';
import EditProfileModal from '@/components/ProfilePage/EditProfileModal';
import InformationBar from '@/components/ProfilePage/InformationBar';
import SubjectSection from '@/components/ProfilePage/SubjectSection/layout';
import responseConvertSchedule from '@/feature/responseConvertSchedule';
import useScheduleStore from '@/store/useSchedule';


export default function ProfilePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const apiClient = new ApiClient();
  const token = useTokenStore((state : any) => state.token);
  
  const { 
    submitSubjectModule, 
    submitGrade, 
    submitFocusSubject, 
    submitWhatWeek
  } = useFormStore();

  // 스케줄 재생성 함수
  
  const regenerateSchedule = async () => {
          try {
              const taskData = convertScheduleStruct({
                  submitSubjectModule: submitSubjectModule,
                  //@ts-ignore
                  submitGrade: submitGrade,
                  submitFocusSubject: submitFocusSubject,
                  submitWhatWeek: submitWhatWeek
              });
              
              console.log('===== Task Data =====');
  console.log('Full task data:', JSON.stringify(taskData, null, 2));
  console.log('Subjects:');
  taskData.subjects.forEach((subject, index) => {
      console.log(`Subject ${index + 1}:`, {
          ...subject,
          work: subject.work.join(', ') // 배열을 문자열로 변환
      });
  });
  console.log('====================');
              
              if (!token) {
                  console.warn('No token found in store');
                  Alert.alert('오류', '로그인이 필요합니다.');
                  return;
              }
      
              apiClient.setToken(token);
              console.log('Token set in apiClient');
      
              // Add timeout handling (20 seconds)
              const timeoutDuration = 20000;
              const timeoutPromise = new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.')), timeoutDuration)
              );
      
              console.log('Sending request to server...');
              
              // Race between the API call and the timeout
              const response = await Promise.race([
                  apiClient.createSchedule(taskData),
                  timeoutPromise
              ]) as any; // Type assertion since we know the response type from the API
      
              console.log('===== Server Response =====');
              console.log('Status:', response?.status);
              console.log('Data:', response?.data || response);
              console.log('Headers:', response?.headers);
              setResponse(response);
              console.log('===========================');
              
              if (response && (response.data?.message || response.message)) {
                  const message = response.data?.message || response.message;
                  console.log('일정이 성공적으로 생성되었습니다:', message);
                  Alert.alert('성공', '일정이 성공적으로 생성되었습니다.');
                  const schedule: Record<string, any> = responseConvertSchedule(response);
                  useScheduleStore.setState({ schedule });
                  Alert.alert('성공', '일정이 성공적으로 저장되었습니다.');
                  console.log(schedule);  
              } else {
                  console.error('서버 응답에 오류가 있습니다:', response);
                  Alert.alert('오류', '서버 응답을 처리하는 중 오류가 발생했습니다.');
              }
          } catch (error) {
              console.error('일정 생성 중 오류 발생:', error);
              Alert.alert(
                  '오류', 
                  error instanceof Error 
                      ? `일정 생성 중 오류가 발생했습니다: ${error.message}` 
                      : '알 수 없는 오류가 발생했습니다.'
              );
          }
      };
     


const {submitName, submitGmail, submitSchool} = useFormStore();

  return (
    <>
      <PageDefault title="프로필">
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <SectionDefault title={'개인정보 부분'}>
            <CustomView
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.small}
                style={{marginTop: SPACING.small}}
            >
            <InformationBar title={'이름'} text={submitName}/>
            <InformationBar title={'이메일'} text={submitGmail}/>
            <InformationBar title={'비밀번호'} text={'**********'}/>
            <InformationBar title={'학년/학교'} text={submitGrade + '학년/' + submitSchool}/>
            <SubjectSection/>
            </CustomView>
            <CustomView
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.small}
            >
                <CustomButton
                    text={'과목 수정'}
                    onPress={() => setIsModalVisible(true)}
                    backgroundColor={COLORS.brand.primary}
                    style={{borderRadius: SPACING.tiny}}
                    width={'100%'}
                    height={43}
                    fontSize={FONTS.size.body}
                    textColor={COLORS.bng.primary}
                    textWeight={600}
                />
                <CustomButton
                    text={'스케줄 재생성'}
                    onPress={regenerateSchedule}
                    backgroundColor={COLORS.brand.primary}
                    style={{borderRadius: SPACING.tiny}}
                    width={'100%'}
                    height={43}
                    fontSize={FONTS.size.body}
                    textColor={COLORS.bng.primary}
                    textWeight={600}
                />
            </CustomView>
          </SectionDefault>
          <SectionDefault title="하드웨어 부분">
            <CustomView
              width={'100%'}
              height={400}
              alignItems={'center'}
              justifyContent={'flex-end'}
              gap={SPACING.small}
            >
              <CustomImage
                source={require('@/assets/images/icon.png')}
                width={300}
                height={300}
              />
              <CustomText fontSize={FONTS.size.head} textColor={COLORS.text.primary} fontWeight={600}>
                Fycus-hardware
              </CustomText>
            </CustomView>
            <InformationBar title="연결 상태" text="연결 안됨" />
            <InformationBar title="배터리" text="70%" />
          </SectionDefault>
        </ScrollView>
      </PageDefault>
      <NavBar />
      <EditProfileModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.text.second,
  },
  confirmButton: {
    backgroundColor: COLORS.brand.primary,
  },
  buttonText: {
    color: 'white',
  },
});