import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import SectionDefault from "@/components/general/SectionDefault";

export default function ProfilePage() {
    return (
        <>
        <PageDefault title={'Profile'}>
            <SectionDefault title={'Profile'}>
                <CustomView>
                    <CustomText>ProfilePage</CustomText>
                </CustomView>
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}