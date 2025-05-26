import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";

export default function Second() {
    return (
        <CustomView style={{flex : 1}} alignItems={'center'} justifyContent={'center'}>
            <CustomText fontSize={FONTS.size.body} style={{fontWeight : 500}}>
                먼저, 기초 세팅을 시작하겠습니다.
            </CustomText>
        </CustomView>
    )
}