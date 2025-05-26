import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import First from "@/components/Onboard/Section/first";
import Second from "@/components/Onboard/Section/second";
import Forth from "@/components/Onboard/Section/forth";

export default function Onboard() {
    return (
        <CustomView style={{flex: 1}} alignItems={'center'} justifyContent={'center'}>
            {/*<First/>*/}
            {/*<Second/>*/}
            <Forth/>
        </CustomView>
    )
}