import PageDefault from "@/components/general/PageDefault";
import CustomText from "@/components/general/CustomText";
import SectionDefault from "@/components/general/SectionDefault";
import CustomView from "@/components/general/CustomView";
import FocusByHourSection from "../../components/TimePage/FocusByHourSection";

export default function TabTwoScreen() {
  return (
    <PageDefault title={'시간'}>
      <SectionDefault title={'시간대별 집중내역'}>
        <FocusByHourSection/>
      </SectionDefault>
    </PageDefault>
  );
}


