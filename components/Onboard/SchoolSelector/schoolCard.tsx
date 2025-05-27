import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import { SPACING } from "@/styles/spacing";
import { FONTS } from "@/styles/fonts";
import { COLORS } from "@/styles/colors";
import { Pressable } from "react-native"; // Pressable 추가

interface IProps {
    name: string;
    locate: string;
    isSelected: boolean; // 선택 상태
    onSelect: () => void; // 선택 이벤트
}

export default function SchoolCard(props: IProps) {
    const { name, locate, isSelected, onSelect } = props;

    return (
        <Pressable onPress={onSelect}> {/* 부모로부터 받은 onSelect 호출 */}
            <CustomView
                width={"100%"}
                borderRadius={SPACING.superTiny}
                justifyContent={"center"}
                alignItems={"flex-start"}
                gap={SPACING.superTiny}
                style={{
                    borderWidth: isSelected ? 1 : 0,
                    borderColor: isSelected ? COLORS.brand.primary : "transparent",
                    borderStyle: "solid",
                }}
                paddingHorizontal={SPACING.tiny}
                paddingVertical={SPACING.tiny}
            >
                <CustomText
                    fontSize={FONTS.size.body}
                    textColor={COLORS.text.primary}
                >
                    {name}
                </CustomText>
                <CustomText
                    fontSize={FONTS.size.small}
                    textColor={COLORS.text.fifth}
                >
                    {locate}
                </CustomText>
            </CustomView>
        </Pressable>
    );
}