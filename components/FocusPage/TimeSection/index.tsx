import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

// 분을 HH:MM 형식으로 변환하는 함수
const formatMinutesToHHMM = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

interface IProps {
    focusTime : number,
    measureTime : number,
}

export default function TimeSection(props : IProps) {
    const {focusTime, measureTime} = props;
    
    return (
        <CustomView
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={SPACING.superHuge}
            flexDirection={'row'}
        >
            <CustomView
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.tiny}
            >
                <CustomText     
                    fontSize={FONTS.size.body}
                    textColor={COLORS.text.third}
                >순수 집중시간</CustomText>
                <CustomText
                    fontSize={FONTS.size.huge}
                    textColor={COLORS.text.primary}
                    fontWeight={600}
                >{formatMinutesToHHMM(focusTime)}</CustomText>
            </CustomView>
            <CustomView
                alignItems={'center'}
                justifyContent={'center'}
                gap={SPACING.tiny}
            >
                <CustomText
                    fontSize={FONTS.size.body}
                    textColor={COLORS.text.third}
                >순수 집중시간</CustomText>
                <CustomText
                    fontSize={FONTS.size.huge}
                    textColor={COLORS.text.primary}
                    fontWeight={600}
                >{formatMinutesToHHMM(measureTime)}</CustomText>
            </CustomView>
        </CustomView>
    )
}