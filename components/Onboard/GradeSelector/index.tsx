import { useState } from "react";
import { SPACING } from "@/styles/spacing";
import SelectCard from "@/components/general/SelectCard";
import CustomView from "@/components/general/CustomView";
import { Button, View } from "react-native";

export default function GradeSelector() {
    const [selectedGrade, setSelectedGrade] = useState<string | null>(null); // 하나만 선택하도록 관리

    const handleSelect = (grade: string) => {
        if (selectedGrade === grade) {
            setSelectedGrade(null); // 동일 항목 클릭 시 선택 해제
        } else {
            setSelectedGrade(grade); // 새 항목 선택
        }
    };

    return (
        <CustomView
            width="100%"
            flexDirection="column"
            height="100%"
            paddingVertical={SPACING.small}
            paddingHorizontal={SPACING.small}
        >
            <CustomView flexDirection="row" justifyContent="space-between" width="100%">
                {/* SelectCard의 isChecked는 상위 컴포넌트 상태에 의해 결정 */}
                <SelectCard
                    isChecked={selectedGrade === "1학년"}
                    name="1학년"
                    onChange={() => handleSelect("1학년")}
                />
                <SelectCard
                    isChecked={selectedGrade === "2학년"}
                    name="2학년"
                    onChange={() => handleSelect("2학년")}
                />
                <SelectCard
                    isChecked={selectedGrade === "3학년"}
                    name="3학년"
                    onChange={() => handleSelect("3학년")}
                />
            </CustomView>

            {/* 선택되었을 경우 '확정' 버튼 렌더링 */}
            {selectedGrade && (
                <View style={{ marginTop: 20 }}>
                    <Button title="확정" onPress={() => alert(`${selectedGrade} 확정되었습니다.`)} />
                </View>
            )}
        </CustomView>
    );
}