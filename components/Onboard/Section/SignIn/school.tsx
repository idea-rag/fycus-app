import CustomView from "@/components/general/CustomView";
import {SPACING} from "@/styles/spacing";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";
import CustomInput from "@/components/general/CustomInput";
import CustomButton from "@/components/general/CustomButton";
import {COLORS} from "@/styles/colors";
import NextButton from "@/components/Onboard/NextButton";
import {useState} from "react";
import ModalContainer from "@/components/general/Modal";

export default function School() {


    const [isSchoolModalVisible, setIsSchoolModalVisible] = useState(false);

    const openSchoolModal = () => setIsSchoolModalVisible(true);
    const closeSchoolModal = () => setIsSchoolModalVisible(false);

    const [isGradeModalVisible, setIsGradeModalVisible] = useState(false);

    const openGradeModal = () => setIsGradeModalVisible(true);
    const closeGradeModal = () => setIsGradeModalVisible(false);

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
                    <CustomButton
                        text={'학교를 선택하세요'}
                        textColor={'rgba(54,54,54,0.25)'}
                        hasBorder={true}
                        borderColor={'rgba(54,54,54,0.1)'}
                        justifyText={'flex-start'}
                        width={'100%'}
                        fontSize={FONTS.size.small}
                        style={{ borderRadius: SPACING.tiny, paddingVertical: SPACING.tiny, paddingHorizontal: SPACING.tiny }}
                        onPress={openSchoolModal}
                    />
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
                        text={'학년을 선택하세요'}
                        textColor={'rgba(54,54,54,0.25)'}
                        hasBorder={true}
                        borderColor={'rgba(54,54,54,0.1)'}
                        justifyText={'flex-start'}
                        width={'100%'}
                        fontSize={FONTS.size.small}
                        style={{ borderRadius: SPACING.tiny, paddingVertical: SPACING.tiny, paddingHorizontal: SPACING.tiny }}
                        onPress={openGradeModal}
                    />
                </CustomView>
                <NextButton/>
            </CustomView>
            <ModalContainer isVisible={isSchoolModalVisible} onClose={closeSchoolModal}>
                <CustomView>

                </CustomView>
            </ModalContainer>
            <ModalContainer isVisible={isGradeModalVisible} onClose={closeGradeModal}>
                <CustomView>

                </CustomView>
            </ModalContainer>
        </>
)}
