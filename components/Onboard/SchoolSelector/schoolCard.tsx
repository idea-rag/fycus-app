import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import { SPACING } from "@/styles/spacing";
import { FONTS } from "@/styles/fonts";
import { COLORS } from "@/styles/colors";
import { Pressable } from "react-native"; 

interface IProps {
    name: string;
    locate: string;
    isSelected: boolean; 
    onSelect: () => void; 
}

export default function SchoolCard(props: IProps) {
    const { name, locate, isSelected, onSelect } = props;

    return (
        <Pressable onPress={onSelect}> {}
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