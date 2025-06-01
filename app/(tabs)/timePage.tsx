import FocusByHourDetail from "@/components/TimePage/FocusByHourDetail";
import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import SectionDefault from "@/components/general/SectionDefault";
import FocusByHourSection from "../../components/TimePage/FocusByHourSection";

export default function TimePage() {
  return (
    <>
    <PageDefault title={'시간'}>
      <SectionDefault title={'시간대별 집중내역'}>
          <FocusByHourSection/>
      </SectionDefault>
        <FocusByHourDetail/>
    </PageDefault>
    <NavBar/>
    </>
  );
}


