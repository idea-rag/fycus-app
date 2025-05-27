import CustomView from "@/components/general/CustomView";
import { SPACING } from "@/styles/spacing";
import CustomText from "@/components/general/CustomText";
import CustomInput from "@/components/general/CustomInput";
import CustomButton from "@/components/general/CustomButton";
import { FONTS } from "@/styles/fonts";
import { COLORS } from "@/styles/colors";
import SchoolCard from "@/components/Onboard/SchoolSelector/schoolCard";
import { useState } from "react";
import useForm from "@/store/useForm";

interface IProps {
    schoolName: string,
    onFinish: () => void,
}

export default function SchoolSelector(props: IProps) {
    const { schoolName, onFinish } = props;
    //@ts-ignore
    const {submitSchoolSetter} = useForm();
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

    // 선택 처리 함수
    const handleSelect = (name: string) => {
        setSelectedSchool((prev) => prev === name ? null : name); // 동일 카드 선택 시 해제
    };

    const handleConfirm = () => {
        onFinish();
        submitSchoolSetter(selectedSchool);
    }

        const schoolData = {
        name: schoolName,
        locate: "서울특별시 중랑구 봉화산로 174",
    };

    return (
        <CustomView
            width={"100%"}
            height={"100%"}
            paddingHorizontal={SPACING.medium}
            paddingVertical={SPACING.medium}
            flexDirection={"column"}
            gap={SPACING.small}
        >
            {/* 검색 입력 */}
            <CustomView
                width={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={SPACING.tiny}
                flexDirection={"row"}
            >
                <CustomInput placeholder={"학교를 입력하세요..."} width={"85%"} />
                <CustomButton
                    text={"찾기"}
                    width={"15%"}
                    fontSize={FONTS.size.small}
                    backgroundColor={COLORS.brand.primary}
                    height={30}
                    textColor={"white"}
                    textWeight={700}
                />
            </CustomView>

            {/* SchoolCard 리스트 */}
            <CustomView width={"100%"} height={"70%"}>
                <SchoolCard
                    name={schoolData.name}
                    locate={schoolData.locate}
                    isSelected={selectedSchool === schoolData.name} // 선택 상태 전달
                    onSelect={() => handleSelect(schoolData.name)} // 선택 이벤트 전달
                />
            </CustomView>

            {/* 확정 버튼 */}
            {selectedSchool && (
                <CustomButton
                    text={"확정"}
                    width={"100%"}
                    backgroundColor={COLORS.brand.primary}
                    textColor={"white"}
                    height={30}
                    fontSize={FONTS.size.small}
                    textWeight={700}
                    onPress={handleConfirm} // 확정 버튼 클릭 시 모달 닫기
                />
            )}
        </CustomView>
    );
}