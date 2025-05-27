import { useState } from "react";
import { SPACING } from "@/styles/spacing";
import SelectCard from "@/components/general/SelectCard";
import CustomView from "@/components/general/CustomView";
import CustomButton from "@/components/general/CustomButton";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import useForm from "@/store/useForm";

interface IProps {
    onFinish: () => void; // 모달 닫기 함수
}

export default function GradeSelector({ onFinish }: IProps) {
    const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
    //@ts-ignore
    const { submitGrade, submitGradeSetter } = useForm();

    const handleSelect = (grade: number) => {
        if (selectedGrade === grade) {
            setSelectedGrade(null); // 동일 항목 클릭 시 선택 해제
        } else {
            setSelectedGrade(grade); // 새로운 항목 선택
        }
    };

    const handleConfirm = () => {
        onFinish();
        submitGradeSetter(selectedGrade);
    };

    return (
        <CustomView
            width="100%"
            flexDirection="column"
            height="100%"
            alignItems="center"
            justifyContent="space-between"
            gap={SPACING.small}
            paddingVertical={SPACING.small}
            paddingHorizontal={SPACING.small}
        >
            <CustomView flexDirection="row" justifyContent="space-between" width="100%">
                {/* SelectCard의 isChecked는 상위 컴포넌트 상태에 의해 결정 */}
                <SelectCard
                    width={90}
                    isChecked={selectedGrade === 1}
                    name="1학년"
                    onChange={() => handleSelect(1)}
                />
                <SelectCard
                    width={90}
                    isChecked={selectedGrade === 2}
                    name="2학년"
                    onChange={() => handleSelect(2)}
                />
                <SelectCard
                    width={90}
                    isChecked={selectedGrade === 3}
                    name="3학년"
                    onChange={() => handleSelect(3)}
                />
            </CustomView>
            {selectedGrade && (
                <CustomButton
                    width="100%"
                    style={{ paddingVertical: SPACING.small, paddingHorizontal: SPACING.small }}
                    text="확정"
                    textColor="white"
                    fontSize={FONTS.size.small}
                    textWeight={700}
                    backgroundColor={COLORS.brand.primary}
                    onPress={handleConfirm}
                />
            )}
        </CustomView>
    );
}