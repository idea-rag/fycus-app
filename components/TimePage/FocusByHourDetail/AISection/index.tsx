import CustomView from "@/components/general/CustomView";
import {SPACING} from "@/styles/spacing";
import {FontAwesome} from "@expo/vector-icons";
import {COLORS} from "@/styles/colors";
import Logo from "@/components/general/Logo";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";
import {StyleSheet} from "react-native";

interface IProps {
    message : string,
}

export default function AISection(props : IProps) {
    const {message} = props;
    return(
        <CustomView
            width={'100%'}
            paddingHorizontal={SPACING.superTiny}
            paddingVertical={SPACING.tiny}
            justifyContent={'flex-start'}
            alignItems={'center'}
            flexDirection={'row'}
            gap={SPACING.superTiny}
        >
            <CustomView
                width={40}
                height={40}
                borderRadius={20}
                style={styles.logoContainer}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Logo width={22} height={22}/>
            </CustomView>
            <CustomText
                textColor={COLORS.text.primary}
                fontSize={FONTS.size.small}
            >
                {message}
            </CustomText>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    logoContainer:{
        shadowColor: "rgba(0,0,0,0.25)",
        shadowOffset: {
            width: 2,
            height: 2,
        },
    }
})