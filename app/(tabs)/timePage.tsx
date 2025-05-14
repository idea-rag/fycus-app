import PageDefault from "@/components/general/PageDefault";
import CustomText from "@/components/general/CustomText";
import SectionDefault from "@/components/general/SectionDefault";
import CustomView from "@/components/general/CustomView";
import FocusByHourSection from "../../components/TimePage/FocusByHourSection";
import FocusByHourCard from "@/components/TimePage/FocusByHourSection/FocusByHourCard";
import {TimeBar} from "@/components/TimePage/TimeBar";
import FocusByHourDetail from "@/components/TimePage/FocusByHourDetail";

export default function TabTwoScreen() {
  return (
    <PageDefault title={'시간'}>
      <SectionDefault title={'시간대별 집중내역'}>
          <FocusByHourSection/>
          <FocusByHourDetail/>
      </SectionDefault>
    </PageDefault>
  );
}


