import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import CustomButton from "@/components/general/CustomButton";

type NextButtonProps = {
    onPress?: () => void; 
};

export default function NextButton({ onPress }: NextButtonProps) {
    return (
        <CustomButton
            text={'다음으로'}
            textColor={COLORS.bng.primary}
            width={'100%'}
            textWeight={700}
            fontSize={FONTS.size.small}
            backgroundColor={COLORS.brand.primary}
            style={{ borderRadius: SPACING.tiny, paddingVertical: SPACING.small }}
            onPress={onPress} 
        />
    );
}