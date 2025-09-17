import CustomButton from "@/components/general/CustomButton";
import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import SectionDefault from "@/components/general/SectionDefault";
import TaskCalendar from "@/components/TaskPage/TaskCalendar";
import TaskList from "@/components/TaskPage/TaskList";
import { MonthTasks } from "@/data/scehdule";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import convertScheduleStruct from "@/feature/convertScheduleStruct";
import { useRouter } from "expo-router";
import useFormStore from "@/store/useForm";
import ApiClient from "@/http/https";
import { Alert } from "react-native";
import { useTokenStore } from "@/store/useToken";
import { useState } from "react";
import useScheduleStore from "@/store/useSchedule";
import responseConvertSchedule from "@/feature/responseConvertSchedule";

export default function CalendarPage() {
    const router = useRouter();
    const [response,setResponse] = useState()
    const apiClient = new ApiClient();
    
    // Get token from the store
    //@ts-ignore
    const token = useTokenStore((state) => state.token);
    const {schedule} = useScheduleStore();
    
    //@ts-ignore
    const {submitSubjectModule, submitGrade, submitFocusSubject, submitWhatWeek} = useFormStore();

    const handleAddTask = async () => {
        try {
            const taskData = convertScheduleStruct({
                submitSubjectModule: submitSubjectModule,
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

    const handleStoreTask = () => {
        if (!response) return;
        const schedule = responseConvertSchedule(response);
        useScheduleStore.setState({ schedule });
        Alert.alert('성공', '일정이 성공적으로 저장되었습니다.');
        console.log(schedule);
    };


    return (
        <>
        <PageDefault title={'일정'}>
            <SectionDefault title={'오늘의 할일'}>
                <TaskList tasks={schedule['2025-09-17']}/>
                <TaskCalendar MonthTasks={schedule}/>
                <CustomButton
                    text="오늘의 할일 추가하기"
                    width={'100%'}
                    backgroundColor={COLORS.brand.primary}
                    textColor={COLORS.bng.primary}
                    textWeight={'700'}
                    fontSize={FONTS.size.small}
                    height={30}
                    onPress={handleAddTask}
                />
                <CustomButton
                    text="오늘의 할일 저장하기"
                    width={'100%'}
                    backgroundColor={COLORS.brand.primary}
                    textColor={COLORS.bng.primary}
                    textWeight={'700'}
                    fontSize={FONTS.size.small}
                    height={30}
                    onPress={handleStoreTask}
                />
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}       