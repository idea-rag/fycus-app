import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

interface IProps {
    subject : string;
    publisher : string;
    work : string[];
    onPress : () => void;
}

export default function SubjectNWorkBox(props : IProps) {
    const {subject, publisher, work, onPress} = props;
    return (
        <CustomView
            width={'100%'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            flexDirection={'column'}
            gap={SPACING.medium}
            
        >
            <CustomText fontSize={FONTS.size.small} textColor={COLORS.text.second}>{subject} - {publisher}</CustomText>
            <CustomButton
                text={work.length > 0 ? work.join(', ') : '범위를 선택해주세요...'}
                width={'100%'}
                height={40}
                backgroundColor={COLORS.bng.primary}
                textColor={work.length > 0 ? COLORS.text.primary: COLORS.text.fifth}
                fontSize={FONTS.size.small}
                textWeight={600}
                style={{
                    borderRadius : SPACING.tiny,
                    borderWidth : 1,
                    borderColor : COLORS.text.fifth,
                    paddingHorizontal : SPACING.tiny,
                }}
                onPress={onPress}
            />
        </CustomView>
    )
}