import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import CustomButton from "@/components/general/CustomButton";

type NextButtonProps = {
    onPress?: () => void; // 부모 컴포넌트에서 전달받는 콜백 함수
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
            onPress={onPress} // 클릭 시 상위 콜백 호출
        />
    );
}