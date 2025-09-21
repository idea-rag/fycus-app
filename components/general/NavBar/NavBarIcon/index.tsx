import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { whereAmI } from "@/feature/whereAmI";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

interface IProps {
    name: string,
    icon: MaterialIconName,
    toGo: string
}

export default function NavBarIcon(props: IProps) {
    const { name, icon, toGo } = props;
    const isGo = whereAmI(toGo);
    const navigate = useRouter();

    const iconColor = isGo ? COLORS.brand.primary : COLORS.text.third;
    const textColor = isGo ? COLORS.brand.primary : COLORS.text.forth;
    const iconSize = 32;

    return (
        <CustomView alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity
                onPress={() => navigate.navigate(toGo as any)}
                style={{
                    alignItems: 'center',
                    gap: SPACING.tiny,
                    paddingVertical: SPACING.superTiny,
                    paddingHorizontal: SPACING.superTiny,
                    justifyContent: 'center',
                    
                }}
            >
                <MaterialIcons name={icon} size={iconSize} color={iconColor} />
                <CustomText fontSize={FONTS.size.body} textColor={textColor}>
                    {name}
                </CustomText>
            </TouchableOpacity>
        </CustomView>
    );
}