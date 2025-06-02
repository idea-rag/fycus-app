import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { whereAmI } from "@/feature/whereAmI";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap;

interface IProps {
    name : string,
    icon : FontAwesomeIconName,
    toGo : string,
}

export default function NavBarIcon(props : IProps) {
    const {name, icon, toGo} = props;
    const isGo = whereAmI(toGo);
    const navigate = useRouter();

    if(isGo) {
        return (
                <CustomView
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <TouchableOpacity
                        // @ts-ignore
                        onPress={() => navigate.push(toGo)}
                        style={{
                            alignItems : 'center',
                            gap : SPACING.superTiny,
                            paddingVertical : SPACING.superTiny,
                            paddingHorizontal : SPACING.superTiny,
                            justifyContent : 'center',
                        }}
                    >
                        <FontAwesome name={icon} size={36} color={COLORS.brand.primary}/>
                        <CustomText fontSize={FONTS.size.small} textColor={COLORS.brand.primary}>{name}</CustomText>
                    </TouchableOpacity>
                </CustomView>
        )
    } else {
        return (
            <CustomView
                    alignItems={'center'}
                    justifyContent={'center'}
                >
            <TouchableOpacity
                // @ts-ignore
                onPress={() => navigate.push(toGo)}
                style={{
                    alignItems : 'center',
                    gap : SPACING.superTiny,
                    paddingVertical : SPACING.superTiny,
                    paddingHorizontal : SPACING.superTiny,
                    justifyContent : 'center',
                }}
            >
                <FontAwesome name={icon} size={36} color={COLORS.text.third}/>
                <CustomText fontSize={FONTS.size.small} textColor={COLORS.text.forth}>{name}</CustomText>
            </TouchableOpacity>
            </CustomView>
        )
    }
}