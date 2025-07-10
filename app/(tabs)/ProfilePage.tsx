import CustomView from "@/components/general/CustomView";
import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import SectionDefault from "@/components/ProfilePage/SectionDefault";

export default function ProfilePage() {
    return (
        <>
        <PageDefault title={'프로필'}>
            <SectionDefault title={'개인정보 부분'}>
                <CustomView>
                </CustomView>
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}