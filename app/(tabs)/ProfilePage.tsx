import { useState } from 'react';
import { Alert } from 'react-native';
import CustomButton from "@/components/general/CustomButton";
import CustomImage from "@/components/general/CustomImage";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import InformationBar from "@/components/ProfilePage/InformationBar";
import SectionDefault from "@/components/ProfilePage/SectionDefault";
import SubjectSection from "@/components/ProfilePage/SubjectSection/layout";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import useFormStore from "@/store/useForm";
import EditProfileModal from "@/components/EditProfileModal";

type SubjectModule = {
  subject: string;
  color: string;
  scope?: string;
};

export default function ProfilePage() {
    const {

        //@ts-ignore
        submitName, submitGmail, submitPassword, submitSchool, submitGrade, submitSubjectModule = [], submitFocusSubject, submitWhatWeek, setFormData
    } = useFormStore();

    const [isModalVisible, setIsModalVisible] = useState(false);
    
    // 과목 모듈을 가져오거나 기본값 설정
    //@ts-ignore
    const initialSubjects: SubjectModule[] = Array.isArray(submitSubjectModule) 
        ? submitSubjectModule 
        : [];

    const handleUpdateSubjects = (updatedSubjects: SubjectModule[]) => {
        // Zustand 스토어 업데이트
        setFormData({
            submitSubjectModule: updatedSubjects,
        });
        Alert.alert('성공', '과목이 성공적으로 업데이트되었습니다.');
    };

    return (
        <>
        <PageDefault title={'프로필'}>
            <SectionDefault title={'개인정보 부분'}>
                <InformationBar title={'이름'} text={submitName}/>
                <InformationBar title={'이메일'} text={submitGmail}/>
                <InformationBar title={'비밀번호'} text={'**********'}/>
                <InformationBar title={'학년/학교'} text={submitGrade + '학년/' + submitSchool}/>
                <SubjectSection/>
                <CustomView
                    width={'100%'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <CustomButton
                        text={'과목 수정'}
                        onPress={() => setIsModalVisible(true)}
                        backgroundColor={COLORS.brand.primary}
                        style={{borderRadius: SPACING.tiny}}
                        width={127}
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
                    <CustomText fontSize={FONTS.size.head} textColor={COLORS.text.primary} fontWeight={600}>Fycus-hardware</CustomText>
                </CustomView>
                <InformationBar title="연결 상태" text="연결 안됨"/>
                <InformationBar title="배터리" text="70%"/>
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        <EditProfileModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
        />
        </>
    );
}
