import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

interface IProps {
    title : string;
    beforeError : string;
    afterError : string;
    beforeTime : string;
    afterTime : string;
}

export default function FeedbackCard(props : IProps) {
    const {title, beforeError, afterError, beforeTime, afterTime} = props;
    return (
        <CustomView
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDirection='row'
            gap={SPACING.medium}
        >
            <CustomText
                fontSize={14}
                fontWeight={500}
            >
                {title}
            </CustomText>
            <CustomView
                justifyContent={'flex-end'}
                alignItems={'center'}
                gap={SPACING.tiny}
                flexDirection='row'
            >
                <CustomView flexDirection="row">
                    <CustomText
                        fontSize={FONTS.size.small}
                        textColor={COLORS.text.third}
                    >
                        오류 : {beforeError}개 - 
                    </CustomText>
                    <CustomText
                        fontSize={FONTS.size.small}
                        textColor={COLORS.brand.primary}
                        fontWeight={600}
                    >
                        {afterError}개
                    </CustomText>
                </CustomView>
                <CustomView flexDirection="row">
                    <CustomText
                        fontSize={FONTS.size.small}
                        textColor={COLORS.text.third}
                    >
                        시간 : {beforeTime} - 
                    </CustomText>
                    <CustomText
                        fontSize={FONTS.size.small}
                        textColor={COLORS.brand.primary}
                        fontWeight={600}
                    >
                        {afterTime}
                    </CustomText>
                </CustomView>
            </CustomView>
        </CustomView>   
    )
}