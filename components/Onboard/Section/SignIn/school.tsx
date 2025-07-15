import CustomButton from "@/components/general/CustomButton";
import CustomInput from "@/components/general/CustomInput";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import ModalContainer from "@/components/general/Modal";
import GradeSelector from "@/components/Onboard/GradeSelector";
import NextButton from "@/components/Onboard/NextButton";
import useForm from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useState } from "react";

interface IProps {
    onNext: () => void;
}

export default function School({ onNext }: IProps) {
    //@ts-ignore
    const { submitGrade, submitSchoolSetter } = useForm();

    const [isGradeModalVisible, setIsGradeModalVisible] = useState(false);

    const openGradeModal = () => setIsGradeModalVisible(true);
    const closeGradeModal = () => setIsGradeModalVisible(false);

    const handleSchoolChange = (text : string) => {
        submitSchoolSetter(text);
    }

    return (
        <>
            <CustomView
                width={322}
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.medium}
                flexDirection={'column'}
            >
                <CustomText fontSize={FONTS.size.body}>다음으로, 학교와 학년을 선택해주세요.</CustomText>
                <CustomView
                    alignItems={'flex-start'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    width={'100%'}
                    gap={SPACING.superTiny}
                >
                    <CustomText fontSize={FONTS.size.small}>학교</CustomText>
                    <CustomInput placeholder={'학교를 입력하세요...'} width={'100%'} onValueChange={handleSchoolChange}/>
                </CustomView>
                <CustomView
                    alignItems={'flex-start'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    width={'100%'}
                    gap={SPACING.superTiny}
                >
                    <CustomText fontSize={FONTS.size.small}>학년</CustomText>
                    <CustomButton
                        text={submitGrade ? submitGrade : '학년을 선택하세요'}
                        textColor={submitGrade ? COLORS.text.primary : 'rgba(54,54,54,0.25)'}
                        hasBorder={true}
                        borderColor={'rgba(54,54,54,0.1)'}
                        justifyText={'flex-start'}
                        width={'100%'}
                        fontSize={FONTS.size.small}
                        style={{ borderRadius: SPACING.tiny, paddingVertical: SPACING.tiny, paddingHorizontal: SPACING.tiny }}
                        onPress={openGradeModal}
                    />
                </CustomView>
                <NextButton onPress={onNext}/>
            </CustomView>
            <ModalContainer isVisible={isGradeModalVisible} onClose={closeGradeModal}>
                <GradeSelector onFinish={closeGradeModal}/>
            </ModalContainer>
        </>
    )
}
