import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { whereAmI } from "@/feature/whereAmI";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { FontAwesome } from "@expo/vector-icons";

type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap;

interface IProps {
    name : string,
    icon : FontAwesomeIconName,
    toGo ?: string,
}

export default function NavBarIcon(props : IProps) {
    const {name, icon, toGo} = props;
    const isGo = whereAmI(toGo || '');

    if(isGo) {
        return (
            <CustomView
                alignItems={'center'}
                gap={SPACING.superTiny}
                justifyContent={'center'}
                paddingHorizontal={SPACING.superTiny}
            >
                <FontAwesome name={icon} size={42} color={COLORS.brand.primary}/>
                <CustomText fontSize={FONTS.size.small} textColor={COLORS.brand.primary}>{name}</CustomText>
            </CustomView>
        )
    } else {
        return (
            <CustomView
                alignItems={'center'}
                gap={SPACING.superTiny}
                justifyContent={'center'}
                paddingHorizontal={SPACING.superTiny}
            >
                <FontAwesome name={icon} size={42} color={COLORS.text.third}/>
                <CustomText fontSize={FONTS.size.small} textColor={COLORS.text.forth}>{name}</CustomText>
            </CustomView>
        )
    }
}