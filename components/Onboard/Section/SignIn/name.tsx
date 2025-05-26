import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import CustomInput from "@/components/general/CustomInput";
import CustomButton from "@/components/general/CustomButton";
import {COLORS} from "@/styles/colors";
import {SPACING} from "@/styles/spacing";
import {FONTS} from "@/styles/fonts";
import NextButton from "@/components/Onboard/NextButton";

export default function Name(){
    return (

            <CustomView
                width={322}
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.medium}
                flexDirection={'column'}
            >
                <CustomText fontSize={FONTS.size.body}>먼저, 이름을 입력해주세요</CustomText>
                <CustomInput placeholder={'이름을 입력하세요...'} width={'100%'}/>
               <NextButton/>
            </CustomView>
    )
}