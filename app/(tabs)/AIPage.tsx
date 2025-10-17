import FeedbackCard from "@/components/AIPage/feedbackCard";
import SectionDefault from "@/components/AIPage/sectionDefault";
import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import Logo from "@/components/general/Logo";
import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import { useNeurofeedbackStore } from "@/store/useNeurofeedback";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useRouter } from "expo-router";
import { useState } from "react";
import ApiClient from "@/http/https";
import { useTokenStore } from "@/store/useToken";
import { getFeedback } from "@/feature/getFeedback";
import useScheduleStore from "@/store/useSchedule";
import { useStudyTimeStore } from "@/store/useStudyTime";
import { useFeedbackStore } from "@/store/useFeedbackStore";

export default function AIPage() {
    const router = useRouter();
    const [showFeedback, setShowFeedback] = useState(false);
    const { FindDog, SelectSquare, OrderAction } = useNeurofeedbackStore();
    const { schedule } = useScheduleStore();
    const { focusData } = useStudyTimeStore();
    const { setFeedback } = useFeedbackStore();
    //@ts-ignore
    const token = useTokenStore((state) => state.token);
    const apiClient = new ApiClient();
    
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');

    const handleGetFeedback = async () => {
        try {
            setIsLoading(true);
            
            // 전달할 데이터 구조 확인을 위한 로그
            console.log('Sending to getFeedback:', {
                token: token ? 'Token exists' : 'No token',
                focusData: focusData,
                studyData: schedule
            });
            
            const response = await getFeedback({
                token,
                focusData,
                studyData: schedule
            });
            
            console.log('Feedback response:', response);
            
            // 서버로부터 받은 피드백 텍스트를 상태에 저장
            if (response && response.ai_feedback) {
                setFeedbackText(response.ai_feedback);
                setFeedback(response.ai_feedback);
            } else {
                setFeedbackText('피드백을 받아오지 못했습니다.');
            }
            
            setShowFeedback(true);
        } catch (error) {
            console.error('Error getting feedback:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <PageDefault title={'AI'}>
            <SectionDefault title={'AI의 조언'}>
                <CustomView
                    width={'100%'}
                    height={315}
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    gap={SPACING.huge}
                >
                    <CustomView
                        width={150}
                        height={150}
                        style={{
                            backgroundColor: 'white',
                            shadowColor: '#808080',
                            shadowOffset: { width: 4, height: 32 },
                            shadowOpacity: 0.20,
                            shadowRadius: 75,
                            elevation: 12,
                            borderRadius: 75,
                        }}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Logo
                            width={70}
                            height={70}
                        />
                    </CustomView>
                    <CustomText
                        fontSize={FONTS.size.body}
                        fontWeight={300}
                    >
                        Fics의 한마디
                    </CustomText>
                    
                        <CustomText
                            fontSize={FONTS.size.title}
                            fontWeight={600}
                            textColor={COLORS.text.primary}
                        >
                        피드백을 받아보세요.
                        </CustomText>
                    
                </CustomView>
            </SectionDefault>
            <SectionDefault title="AI의 피드백">
                    {showFeedback && (
                        <CustomText
                            fontSize={14}
                            fontWeight={400}
                            style={{ marginBottom: 16, whiteSpace: 'pre-line' }}
                        >
                            {feedbackText || '피드백을 불러오는 중입니다...'}
                        </CustomText>
                    )}
                    {showFeedback ? (
                        null
                    ) : (
                        <CustomButton
                        text={showFeedback ? '피드백 닫기' : '피드백 받기'}
                        width={'100%'}
                        height={50}
                        textColor={COLORS.bng.primary}
                        backgroundColor={COLORS.brand.primary}
                        onPress={handleGetFeedback}
                    />
                    )}
                </SectionDefault>
                <SectionDefault title="뉴로피드백">
                    {
                        FindDog.score !== 0 && SelectSquare.score !== 0 ? (
                            <>
                            <FeedbackCard
                                title="order-action"
                                beforeError={Math.ceil(OrderAction.total * 0.3).toString()} // 예시: 30% 오류율
                                afterError={(OrderAction.total - OrderAction.score).toString()}
                                beforeTime={Math.ceil(OrderAction.timeSpent * 1.2).toString()} // 예시: 20% 개선
                                afterTime={Math.floor(OrderAction.timeSpent).toString()}
                            />
                            <FeedbackCard
                                title="select-square"
                                beforeError={Math.ceil(SelectSquare.total * 0.4).toString()}
                                afterError={(SelectSquare.total - SelectSquare.score).toString()}
                                beforeTime={Math.ceil(SelectSquare.timeSpent * 1.15).toString()}
                                afterTime={Math.floor(SelectSquare.timeSpent).toString()}
                            />
                            <FeedbackCard
                                title="find-dog"
                                beforeError={Math.ceil(FindDog.total * 0.25).toString()}
                                afterError={(FindDog.total - FindDog.score).toString()}
                                beforeTime={Math.ceil(FindDog.timeSpent * 1.1).toString()}
                                afterTime={Math.floor(FindDog.timeSpent).toString()}
                            />
                            </>
                        ) : (
                            <CustomButton
                                text="뉴로피드백 하러가기"
                                width={'100%'}
                                height={50}
                                textColor={COLORS.bng.primary}
                                backgroundColor={COLORS.brand.primary}
                                onPress={() => router.push('/(tabs)/NeurofeedbackPage')}
                            />
                        )
                    }
                </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}