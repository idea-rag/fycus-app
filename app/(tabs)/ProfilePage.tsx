import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import InformationBar from "@/components/ProfilePage/InformationBar";
import SectionDefault from "@/components/ProfilePage/SectionDefault";

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
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}