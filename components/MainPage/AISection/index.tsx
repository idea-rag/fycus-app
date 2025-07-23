import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import Logo from "@/components/general/Logo";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

interface IProps {
    simpleFeedback : string;
}

export default function AISection(props : IProps) {
    const {simpleFeedback} = props;
    const router = useRouter(); // router 객체 가져오기

    return (
        <CustomView
            gap={SPACING.medium}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            width='45%'
        >
            <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} >AI의 한마디</CustomText>
            <CustomView width={'100%'} alignItems={'center'} justifyContent={'center'}>
                <CustomView width={75} height={75} borderRadius={37.5} alignItems={'center'} justifyContent={'center'} style={[styles.circle, {
                            backgroundColor: 'white',
                            shadowColor: '#808080',
                            shadowOffset: { width: 4, height: 32 },
                            shadowOpacity: 0.20,
                            shadowRadius: 37.5,
                            elevation: 12,
                        }]}>
                    <Logo width={40} height={40}/>
                </CustomView>
            </CustomView>
            <CustomView width={'100%'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                <CustomText fontSize={FONTS.size.small} textColor={COLORS.text.primary}>{simpleFeedback}</CustomText>
                <CustomButton text={'자세한 조언 들으러가기'} textColor={COLORS.brand.high} fontSize={FONTS.size.small} onPress={() => router.push('/AIPage')} // 'onboard' 페이지로 이동
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