import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import SectionDefault from "@/components/general/SectionDefault";

export default function CalendarPage() {
    return (
        <>
        <PageDefault title={'Calendar'}>
            <SectionDefault title={'Calendar'}>
                <CustomView>
                    <CustomText>CalendarPage</CustomText>
                </CustomView>
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}       