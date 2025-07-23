import CustomButton from "@/components/general/CustomButton";
import CustomScrollView from "@/components/general/CustomScrollView";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import ModalContainer from "@/components/general/Modal";
import SubjectNWorkBox from "@/components/Onboard/SubjectNWorkBox";
import { register } from "@/feature/register";
import { getWorkList } from "@/feature/subjectExtract";
import useFormStore from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

interface IProps {
    onNext: () => void;
}

export default function Work(props: IProps) {
    const [isWorkModalVisible, setIsWorkModalVisible] = useState(false);
    const [selectSubject, setSelectSubject] = useState('');
    const [workList, setWorkList] = useState<string[]>([]);
    const [selectedWorks, setSelectedWorks] = useState<string[]>([]);
    const { onNext } = props;

    //@ts-ignore
    const { submitSubjectModule, submitSchool, submitGrade, submitSubjectModuleSetter } = useFormStore();

    useEffect(() => {
        console.log('Selected Subject:', selectSubject);
        if (selectSubject) {
            const works = getWorkList(selectSubject, submitSubjectModule, { 
                school: submitSchool, 
                grade: submitGrade 
            });
            console.log('Works:', works);
            setWorkList(works);
            
            const currentSubject = submitSubjectModule.find(
                (item : {subject : string, publisher : string, work : string[]}) => item.subject === selectSubject
            );
            if (currentSubject?.work) {
                setSelectedWorks([...currentSubject.work]);
            } else {
                setSelectedWorks([]);
            }
        } else {
            setWorkList([]);
            setSelectedWorks([]);
        }
    }, [selectSubject, submitSubjectModule]);

    const toggleWorkSelection = (work: string) => {
        setSelectedWorks(prev => {
            const newSelected = prev.includes(work)
                ? prev.filter(w => w !== work) 
                : [...prev, work]; 
            return newSelected;
        });
    };

    const submitFinish = async () => {
        try {
            console.log('[DEBUG] Starting form submission...');
            console.log('[DEBUG] Current submitSubjectModule:', JSON.stringify(submitSubjectModule, null, 2));
            
            // Validate subject modules before submission
            if (!submitSubjectModule || submitSubjectModule.length === 0) {
                const message = '과목을 최소 한 개 이상 선택해주세요.';
                console.warn('[WARNING] Validation failed:', message);
                Alert.alert('입력 오류', message);
                return;
            }

            // Update the form store with current subject modules
            submitSubjectModuleSetter(submitSubjectModule);
            
            console.log('[DEBUG] Starting registration process...');
            const result = await register();
            
            if (result.success) {
                console.log('[SUCCESS] Registration successful:', JSON.stringify(result, null, 2));
                Alert.alert('성공', '회원가입이 완료되었습니다.');
                onNext();
            } else {
                console.error('[ERROR] Registration failed:', result.message);
                Alert.alert(
                    '회원가입 실패',
                    result.message || '회원가입 중 오류가 발생했습니다.\n나중에 다시 시도해주세요.'
                );
            }
        } catch (error) {
            let errorMessage = '알 수 없는 오류가 발생했습니다.';
            let errorDetails = '';
            
            if (error instanceof Error) {
                errorMessage = error.message;
                errorDetails = error.stack || '';
                console.error('[ERROR] Error during registration:', {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    ...(error as any).response?.data && { response: (error as any).response.data }
                });
            } else {
                console.error('[ERROR] Unknown error during registration:', error);
            }
            
            Alert.alert(
                '오류 발생',
                `회원가입 처리 중 오류가 발생했습니다:\n${errorMessage}`,
                [
                    { 
                        text: '자세히 보기', 
                        onPress: () => {
                            Alert.alert(
                                '오류 상세 정보',
                                `${errorMessage}\n\n${errorDetails}`,
                                [
                                    { text: '확인', style: 'cancel' },
                                    {
                                        text: '오류 복사',
                                        onPress: () => {
                                            const errorText = `Error: ${errorMessage}\n\n${errorDetails}`;
                                            // You might want to use a clipboard library here
                                            console.log('Error details copied to console');
                                            Alert.alert('알림', '오류 정보가 콘솔에 복사되었습니다.');
                                        }
                                    }
                                ]
                            );
                        } 
                    },
                    { text: '확인', style: 'cancel' }
                ]
            );
        }
    };

    const finishedWork = () => {
        onNext();
    };
    
    const handleCompleteSelection = () => {
        const updatedModules = submitSubjectModule.map((item : {subject : string, publisher : string, work : string[]}) => 
            item.subject === selectSubject
                ? { ...item, work: selectedWorks }
                : item
        );
        
        const filteredModules = selectedWorks.length === 0
            ? updatedModules.filter((item : {subject : string, publisher : string, work : string[]}) => item.subject !== selectSubject)
            : updatedModules;
        
        submitSubjectModuleSetter(filteredModules);
        closeWorkModal();
    };


    const openWorkModal = (subject: string) => {
        setSelectSubject(subject);
        setIsWorkModalVisible(true);
    };
    
    const closeWorkModal = () => {
        setIsWorkModalVisible(false);
        setSelectSubject('');
        setSelectedWorks([]);
    };

    return (
        <>
            <CustomView
                width={322}
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.medium}
                flexDirection={'column'}
            >
                <CustomText fontSize={FONTS.size.body}>
                    다음으로, 이 교과서중 어느 범위를 공부하고 싶은지 선택하세요.
                </CustomText>
                <CustomView
                    width={'100%'}
                    alignItems={'flex-start'}
                    justifyContent={'flex-start'}
                    flexDirection={'column'}
                    gap={SPACING.medium}
                >
                    {submitSubjectModule.map((subjectModule : {subject : string, publisher : string, work : string[]}, index : number) => (
                        <SubjectNWorkBox
                            key={index}
                            subject={subjectModule.subject}
                            publisher={subjectModule.publisher}
                            work={subjectModule.work}
                            onPress={() => openWorkModal(subjectModule.subject)}
                        />
                    ))}
                </CustomView>
                <CustomButton
                    text={'다음으로'}
                    width={'100%'}
                    height={40}
                    backgroundColor={COLORS.brand.primary}
                    textColor={'white'}
                    fontSize={FONTS.size.small}
                    textWeight={700}
                    onPress={finishedWork}
                />
            </CustomView>

            <ModalContainer
                isVisible={isWorkModalVisible}
                onClose={closeWorkModal}
            >
                <CustomView
                    width={'100%'}
                    height={'100%'}
                    paddingHorizontal={SPACING.small}
                    paddingVertical={SPACING.small}
                >
                    <CustomText fontSize={FONTS.size.body} style={{ marginBottom: 10 }}>
                        {selectSubject} 과목에서 공부하고 싶은 범위를 선택하세요.
                    </CustomText>
                    <CustomScrollView
                        width={'100%'}
                        height={'100%'}
                        flexDirection={'column'}
                        gap={SPACING.small}
                    >
                        {workList.length > 0 ? (
                            workList.map((work: string, index: number) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => toggleWorkSelection(work)}
                                    style={{
                                        padding: 12,
                                        backgroundColor: selectedWorks.includes(work) 
                                            ? COLORS.brand.primary 
                                            : COLORS.bng.primary,
                                        borderRadius: 8,
                                        marginVertical: 4
                                    }}
                                >
                                    <CustomText 
                                        fontSize={FONTS.size.body}
                                        textColor={selectedWorks.includes(work) ? COLORS.bng.primary : COLORS.text.primary}
                                    >
                                        {work}
                                    </CustomText>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <CustomText>표시할 항목이 없습니다.</CustomText>
                        )}
                    </CustomScrollView>
                    <CustomButton
                        text={'다음으로'}
                        width={'100%'}
                        height={40}
                        backgroundColor={COLORS.brand.primary}
                        textColor={'white'}
                        fontSize={FONTS.size.small}
                        textWeight={700}
                        onPress={handleCompleteSelection}
                    />  
                </CustomView>
            </ModalContainer>
        </>
    )
}