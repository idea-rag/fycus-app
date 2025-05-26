import CustomView from "@/components/general/CustomView";
import {schoolRequest} from "@/http/schoolRequest";
import {SPACING} from "@/styles/spacing";
import CustomText from "@/components/general/CustomText";
import CustomInput from "@/components/general/CustomInput";
import CustomButton from "@/components/general/CustomButton";
import {FONTS} from "@/styles/fonts";
import {COLORS} from "@/styles/colors";
import SchoolCard from "@/components/Onboard/SchoolSelector/schoolCard";

interface IProps {
    schoolName : string,
}

export default function SchoolSelector(props : IProps) {
    const {schoolName} = props;

    const schoolData = {name : schoolName, locate : '서울특별시 중랑구 봉화산로 174'}
        // schoolRequest(schoolName);
    return (
        <CustomView
            width={'100%'}
            height={'100%'}
            paddingHorizontal={SPACING.medium}
            paddingVertical={SPACING.medium}
            flexDirection={'column'}
            gap={SPACING.small}
        >
            <CustomView
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.tiny}
                flexDirection={'row'}
            >
                <CustomInput placeholder={'학교를 입력하세요...'} width={'85%'}/>
                <CustomButton
                    text={'찾기'}
                    width={'15%'}
                    fontSize={FONTS.size.small}
                    backgroundColor={COLORS.brand.primary}
                    height={30}
                    textColor={'white'}
                    textWeight={700}
                />
            </CustomView>
            <CustomView>
                <SchoolCard name={schoolData.name} locate={schoolData.locate}/>
            </CustomView>
        </CustomView>
    )
}