import CustomButton from "@/components/general/CustomButton";
import CustomView from "@/components/general/CustomView";
import SelectCard from "@/components/general/SelectCard";
import useForm from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useEffect, useState } from "react";

interface IProps {
    onFinish: () => void; 
}

export default function GradeSelector({ onFinish }: IProps) {
    const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
    const [school, setSchool] = useState('');
    //@ts-ignore
    const { submitSchool, submitGradeSetter } = useForm();

    useEffect(() => {
        setSchool(submitSchool);
    }, [submitSchool]);
    
    const handleSelect = (grade: number) => {
        if (selectedGrade === grade) {
            setSelectedGrade(null); 
        } else {
            setSelectedGrade(grade); 
        }
    };

    const handleConfirm = () => {
        onFinish();
        submitGradeSetter(selectedGrade);
    };

    if (school.includes('고등')) {
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
                    {}
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
    } else if (school.includes('중학교')) {
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
                    {}
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
    } else { 
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
                <CustomView
                    width="100%"
                    flexDirection="column"
                    gap={SPACING.small}
                >
                <CustomView flexDirection="row" justifyContent="space-between" width="100%">
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
                <CustomView flexDirection="row" justifyContent="space-between" width="100%">
                    <SelectCard
                        width={90}
                        isChecked={selectedGrade === 4}
                        name="4학년"
                        onChange={() => handleSelect(4)}
                    />
                    <SelectCard
                        width={90}
                        isChecked={selectedGrade === 5}
                        name="5학년"
                        onChange={() => handleSelect(5)}
                    />
                    <SelectCard
                        width={90}
                        isChecked={selectedGrade === 6}
                        name="6학년"
                        onChange={() => handleSelect(6)}
                    />
                </CustomView>
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
}