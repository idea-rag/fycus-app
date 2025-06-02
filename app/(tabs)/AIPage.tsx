import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import SectionDefault from "@/components/general/SectionDefault";

export default function AIPage() {
    return (
        <>
        <PageDefault title={'AI'}>
            <SectionDefault title={'AI'}>
                <CustomView>
                    <CustomText>AIPage</CustomText> 
                </CustomView>
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}