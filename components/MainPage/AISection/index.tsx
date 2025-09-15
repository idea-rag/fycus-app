import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import Logo from "@/components/general/Logo";
import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

interface IProps {
    simpleFeedback : string;
}

export default function AISection(props : IProps) {
    const {simpleFeedback} = props;
    const router = useRouter(); 

    return (
        <CustomView
            gap={SPACING.tiny}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            paddingHorizontal={SPACING.medium}
            paddingVertical={SPACING.medium}
            style={styles.container}
        >
            <CustomText fontSize={18} textColor={COLORS.text.primary} fontWeight={700} >AI의 한마디</CustomText>
            <CustomView width={'100%'} alignItems={'center'} justifyContent={'flex-start'} flexDirection={'row'} gap={SPACING.medium}>
                <CustomView width={75} height={75} borderRadius={37.5} alignItems={'center'} justifyContent={'center'} style={styles.circle}>
                    <Logo width={32} height={32}/>
                </CustomView>
                <CustomView alignItems={'flex-start'} justifyContent={'flex-start'} gap={SPACING.small}>
                    <CustomText fontSize={14} textColor={COLORS.text.primary}>{simpleFeedback}</CustomText>
                    <CustomButton text={'>>자세한 조언 들으러가기'} textColor={COLORS.brand.high} fontSize={14} onPress={() => router.push('/AIPage')} 
                    />
                </CustomView>
            </CustomView>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    circle:{
        borderWidth: 1,
        borderColor: '#E8E8E8',
        overflow: 'hidden',
    },
    container:{
        width: '100%',
        height: 'auto',
        paddingHorizontal: SPACING.medium,
        paddingVertical: SPACING.medium,
        backgroundColor: COLORS.bng.primary,
        borderRadius: SPACING.medium,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5, // 안드로이드에서의 그림자
    }
})