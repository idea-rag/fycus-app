import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import First from "@/components/Onboard/Section/first";
import Second from "@/components/Onboard/Section/second";
import Forth from "@/components/Onboard/Section/forth";
import Name from "@/components/Onboard/Section/SignIn/name";
import School from "@/components/Onboard/Section/SignIn/school";

export default function Onboard() {
    return (
        <CustomView
            alignItems={'center'}
            justifyContent={'center'}
            style={{flex : 1}}
            width={'100%'}
            height={'100%'}
        >
            {/*<First/>*/}
            {/*<Second/>*/}
            {/*<Forth/>*/}
            {/*<Name/>*/}
            <School/>
        </CustomView>
    )
}