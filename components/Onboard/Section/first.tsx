import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import Logo from "@/components/general/Logo";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { StyleSheet, Text } from "react-native";

export default function First() {
    return (
        <CustomView
            style={{flex : 1}}
            alignItems={'center'}
            justifyContent={'center'}
            gap={SPACING.superHuge}
        >
            <CustomView
                width={150}
                height={150}
                borderRadius={SPACING.superHuge}
                alignItems={'center'}
                justifyContent={'center'}
                style={styles.logoBox}
            >
                <Logo width={80} height={80}/>
            </CustomView>
            <CustomText>
                <CustomText fontSize={FONTS.size.body} style={{fontWeight : 500}}>
                    <Text style={styles.highlight}>Fycus</Text> 에 오신걸 환영합니다.
                </CustomText>
            </CustomText>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    logoBox : {
        boxShadow: '2px 2px 0 rgba(0,0,0,0.20)'
    },
    highlight: {
        color: COLORS.brand.primary
    },

})