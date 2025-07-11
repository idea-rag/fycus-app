//@ts-ignore
import testIcon from "@/assets/images/icon.png";
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

export default function ProfilePage() {
    return (
        <>
        <PageDefault title={'프로필'}>
            <SectionDefault title={'개인정보 부분'}>
                <InformationBar title={'이름'} text={'류한석'}/>
                <InformationBar title={'이메일'} text={'officeshinyujun@gmail.com'}/>
                <InformationBar title={'생년월일'} text={'1998년 10월 1일'}/>
                <InformationBar title={'성별'} text={'남성'}/>
                <InformationBar title={'비밀번호'} text={'********'}/>
                <InformationBar title={'학년/학교'} text={'1학년/서울대학교'}/>
                <SubjectSection/>
                <CustomView
                    width={'100%'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <CustomButton
                        text={'수정하기'}
                        onPress={() => {console.log('수정하기');}}
                        backgroundColor={COLORS.brand.primary}
                        style={{borderRadius : SPACING.tiny}}
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
                        source={testIcon}
                        width={300}
                        height={300}
                    />
                    <CustomText fontSize={FONTS.size.head} textColor={COLORS.text.primary} fontWeight={600}>Fycus-hardware</CustomText>
                </CustomView>
                <InformationBar title="연결 상태" text="연결 중"/>
                <InformationBar title="배터리" text="70%"/>
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}