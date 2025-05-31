import CustomView from "@/components/general/CustomView";
import { SPACING } from "@/styles/spacing";
import CustomText from "@/components/general/CustomText";
import { FONTS } from "@/styles/fonts";
import SubjectNPublishBox from "@/components/Onboard/SubjectNPublishBox";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/styles/colors";
import ModalContainer from "@/components/general/Modal";
import { useState } from "react";
import CustomButton from "@/components/general/CustomButton";
import CustomInput from "@/components/general/CustomInput";

export default function Subject() {
    const [isSubjectModalVisible, setIsSubjectModalVisible] = useState(false);
    const [subjectList, setSubjectList] = useState(['국어']);
    const [publishList, setPublishList] = useState([])
    const [newSubject, setNewSubject] = useState(''); // 입력값을 담을 상태

    const openSubjectModal = () => setIsSubjectModalVisible(true);
    const closeSubjectModal = () => setIsSubjectModalVisible(false);

    const handleAddSubject = () => {
        if (newSubject.trim() !== '') { // 빈 값은 추가하지 않음
            setSubjectList([...subjectList, newSubject]); // 기존의 리스트에 새 과목 추가
            setNewSubject(''); // 입력창 초기화
            closeSubjectModal(); // 모달 닫기
        }
    };

    const handleDeleteSubject = (subject: string) => {
        setSubjectList(subjectList.filter(item => item !== subject)); // 해당 과목 제거
    };

    const handleEditSubject = (oldSubject: string, newSubject: string) => {
        setSubjectList(
            subjectList.map((item) => (item === oldSubject ? newSubject : item)) // 과목 이름 수정
        );
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
                    {subjectList.map((item, index) => (
                        <SubjectNPublishBox
                            subject={item}
                            key={index}
                            onDelete={handleDeleteSubject} // 삭제 핸들러 전달
                            onEdit={handleEditSubject} // 수정 핸들러 전달
                        />
                    ))}
                </CustomView>
                <TouchableOpacity activeOpacity={0.8} onPress={openSubjectModal}>
                    <CustomView
                        width={'100%'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={SPACING.medium}
                    >
                        <MaterialIcons
                            name="add-circle-outline"
                            size={24}
                            color={COLORS.text.third}
                        />
                    </CustomView>
                </TouchableOpacity>
                <CustomButton
                    text={'다음으로'}
                    width={'100%'}
                    height={40}
                    backgroundColor={COLORS.brand.primary}
                    textColor={'white'}
                    fontSize={FONTS.size.small}
                    textWeight={700}
                    onPress={() => console.log(subjectList)} // 버튼 클릭 시 실행
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
        </>
    );
}