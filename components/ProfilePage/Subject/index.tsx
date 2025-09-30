import CustomButton from "@/components/general/CustomButton";
import CustomInput from "@/components/general/CustomInput";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import ModalContainer from "@/components/general/Modal";
import SubjectNPublishBox from "@/components/Onboard/SubjectNPublishBox";
import useFormStore from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import SubjectCard from "@/components/Onboard/Section/SignIn/subjectCard";
import modifyData from "@/assets/data/modify.json";

interface IProps {
    onNext: (data?: any) => void;
    initialData?: any[];
}


export default function Subject(props: IProps) {
    const { onNext, initialData = [] } = props;
    const [isSubjectModalVisible, setIsSubjectModalVisible] = useState(false);
    const [subjectModuleList, setSubjectModuleList] = useState(initialData?.length > 0 ? initialData : []);
    const [selectSubject, setSelectSubject] = useState('');
    const [newSubject, setNewSubject] = useState(''); 
    const [isSubjectSelectorVisible, setIsSubjectSelectorVisible] = useState(false);

    //@ts-ignore
    const { submitSubjectModule, submitSubjectModuleSetter, submitSchool, submitGrade } = useFormStore();
    const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

    // Get available subjects based on school and grade
    useEffect(() => {
        if (!submitSchool || !submitGrade) return;
        let schoolLevel = submitGrade;
        // @ts-ignore
        const gradeData = modifyData[schoolLevel];
        if (gradeData) {
            setAvailableSubjects(Object.keys(gradeData));
        }
    }, [submitSchool, submitGrade]);
    

    const openSubjectModal = () => setIsSubjectModalVisible(true);
    const closeSubjectModal = () => setIsSubjectModalVisible(false);
    const openSubjectSelectorModal = (subject : string) => {
        setIsSubjectSelectorVisible(true);
        setSelectSubject(subject)
    };
    const closeSubjectSelectorModal = () => setIsSubjectSelectorVisible(false);

    const handleAddSubject = () => {
        if (newSubject.trim() !== '') { 
            setSubjectModuleList([...subjectModuleList, {subject: newSubject, publisher: '', work: []}]); 
            setNewSubject(''); 
            closeSubjectModal(); 
        }
    };

    const handleDeleteSubject = (subject: string) => {
        setSubjectModuleList(subjectModuleList.filter(item => item.subject !== subject)); 
    };

    const handleEditSubject = (oldSubject: string, newSubject: string) => {
        setSubjectModuleList(
            subjectModuleList.map((item) => (item.subject === oldSubject ? {subject: newSubject, publisher: '', work: []} : item)) 
        );
    };

    const finalSubjectSubmit = () => {
        submitSubjectModuleSetter(subjectModuleList);
        onNext(subjectModuleList);
    }

    const handlePublisherSelect = (publisher: string) => {
        setSubjectModuleList(
            subjectModuleList.map((item) => (item.subject === selectSubject ? {subject: selectSubject, publisher: publisher, work: []} : item)) 
        );
        closeSubjectSelectorModal();
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
                    다음으로, 지금 공부하고 있는 과목과, 출판사를 입력해주세요.
                </CustomText>
                <CustomText fontSize={FONTS.size.small} style={{ color: COLORS.text.second }}>
                    선택 가능한 과목: {availableSubjects.join(', ')}
                </CustomText>
                <CustomView
                    width={'100%'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    gap={SPACING.medium}
                >
                    {subjectModuleList.map((item, index) => (
                        <SubjectNPublishBox
                            subject={item.subject}
                            publisher={item.publisher}
                            key={index}
                            onDelete={handleDeleteSubject}
                            onEdit={handleEditSubject}
                            
                            onModalOpen={() => openSubjectSelectorModal(item.subject)}
                        />
                    ))}
                </CustomView>
                <TouchableOpacity activeOpacity={0.8} onPress={openSubjectModal} style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: SPACING.medium
                }}>
                        <MaterialIcons
                            name="add-circle-outline"
                            size={24}
                            color={COLORS.text.third}
                        />
                </TouchableOpacity>
                <CustomButton
                    text={'다음으로'}
                    width={'100%'}
                    height={40}
                    backgroundColor={COLORS.brand.primary}
                    textColor={'white'}
                    fontSize={FONTS.size.small}
                    textWeight={700}
                    onPress={finalSubjectSubmit} 
                />
            </CustomView>
            <ModalContainer
                isVisible={isSubjectModalVisible}
                onClose={closeSubjectModal}
                width={300}
                height={150}
                style={{
                    paddingHorizontal: SPACING.small,
                    paddingVertical: SPACING.small,
                    backGroundColor: COLORS.bng.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: SPACING.small,
                }}
            >
                <CustomView
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                    width={'100%'}
                    gap={SPACING.superTiny}
                >
                    <CustomText>과목</CustomText>
                    <CustomInput
                        placeholder={'과목을 입력하세요...'}
                        width={'100%'}
                        onValueChange={setNewSubject} 
                    />
                </CustomView>
                <CustomButton
                    text={'추가하기'}
                    width={'100%'}
                    height={40}
                    backgroundColor={COLORS.brand.primary}
                    textColor={'white'}
                    fontSize={FONTS.size.small}
                    textWeight={700}
                    onPress={handleAddSubject} 
                />
            </ModalContainer>
            <ModalContainer
                isVisible={isSubjectSelectorVisible}
                onClose={closeSubjectSelectorModal}
                width={300}
                height={150}
                style={{
                    paddingHorizontal: SPACING.small,
                    paddingVertical: SPACING.small,
                    backGroundColor: COLORS.bng.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: SPACING.small,
                }}
            >
                <SubjectCard name={selectSubject} onPublisherSelect={handlePublisherSelect}/>    
            </ModalContainer>
        </>
    );
}