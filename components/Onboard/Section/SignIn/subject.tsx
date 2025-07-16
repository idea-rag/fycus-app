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
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import SubjectCard from "./subjectCard";

interface IProps {
    onNext: () => void;
}


export default function Subject(props: IProps) {
    const { onNext } = props;
    const [isSubjectModalVisible, setIsSubjectModalVisible] = useState(false);
    const [subjectModuleList, setSubjectModuleList] = useState([{subject: '', publisher: '', work: []}]);
    const [selectSubject, setSelectSubject] = useState('');
    const [newSubject, setNewSubject] = useState(''); // 입력값을 담을 상태
    const [isSubjectSelectorVisible, setIsSubjectSelectorVisible] = useState(false);

    //@ts-ignore
    const { submitSubjectModule, submitSubjectModuleSetter } = useFormStore();
    

    const openSubjectModal = () => setIsSubjectModalVisible(true);
    const closeSubjectModal = () => setIsSubjectModalVisible(false);
    const openSubjectSelectorModal = (subject : string) => {
        setIsSubjectSelectorVisible(true);
        setSelectSubject(subject)
    };
    const closeSubjectSelectorModal = () => setIsSubjectSelectorVisible(false);

    const handleAddSubject = () => {
        if (newSubject.trim() !== '') { // 빈 값은 추가하지 않음
            setSubjectModuleList([...subjectModuleList, {subject: newSubject, publisher: '', work: []}]); // 기존의 리스트에 새 과목 추가
            setNewSubject(''); // 입력창 초기화
            closeSubjectModal(); // 모달 닫기
        }
    };

    const handleDeleteSubject = (subject: string) => {
        setSubjectModuleList(subjectModuleList.filter(item => item.subject !== subject)); // 해당 과목 제거
    };

    const handleEditSubject = (oldSubject: string, newSubject: string) => {
        setSubjectModuleList(
            subjectModuleList.map((item) => (item.subject === oldSubject ? {subject: newSubject, publisher: '', work: []} : item)) // 과목 이름 수정
        );
    };

    const finalSubjectSubmit =() => {
        submitSubjectModuleSetter(subjectModuleList)
        onNext()
    }

    const handlePublisherSelect = (publisher: string) => {
        setSubjectModuleList(
            subjectModuleList.map((item) => (item.subject === selectSubject ? {subject: selectSubject, publisher: publisher, work: []} : item)) // 출판사 이름 수정
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
                    onPress={finalSubjectSubmit} // 버튼 클릭 시 실행
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
                        onValueChange={setNewSubject} // 입력값 상태 업데이트
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
                    onPress={handleAddSubject} // 버튼 클릭 시 실행
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