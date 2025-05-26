import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";
import {COLORS} from "@/styles/colors";
import {SPACING} from "@/styles/spacing";
import Logo from "@/components/general/Logo";
import {StyleSheet} from "react-native";
import CustomButton from "@/components/general/CustomButton";
import {useNavigation} from "expo-router";

export default function AISection() {
    const navigation = useNavigation(); // navigation 객체 가져오기

    return (
        <CustomView
            gap={SPACING.medium}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            width='45%'
        >
            <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} >AI의 한마디</CustomText>
            <CustomView width={'100%'} alignItems={'center'} justifyContent={'center'}>
                <CustomView width={75} height={75} borderRadius={100} alignItems={'center'} justifyContent={'center'} style={styles.circle}>
                    <Logo width={40} height={40}/>
                </CustomView>
            </CustomView>
            <CustomView width={'100%'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                <CustomText fontSize={FONTS.size.small} textColor={COLORS.text.primary}>전체적으로 완성도 있는 공부입니다. 하지만 국어에 더욱 집중하면 좋겠습니다.</CustomText>
                <CustomButton text={'자세한 조언 들으러가기'} textColor={COLORS.brand.high} fontSize={FONTS.size.small} onPress={() => navigation.navigate('onboard')} // 'onboard' 페이지로 이동
                />
            </CustomView>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    circle:{
        shadowColor: "rgba(0,0,0,0.25)",
        shadowOffset: {
            width: 2,
            height: 2,
        },
    }
})