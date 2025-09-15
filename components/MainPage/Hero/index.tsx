import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { SPACING } from "@/styles/spacing";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";

interface IProps {
    name : string;
    time : number;
}
export default function Hero({name, time} : IProps) {
    return (
        <LinearGradient
            colors={['#941BFF','#D3A1FF', '#F7F7F7']}
            locations={[0.1, 0.74, 1]}
            start={{ x: 0.5, y: 0 }}  // 상단 중앙
            end={{ x: 0.5, y: 1 }}    // 하단 중앙
            style={styles.gradient}
        >
            <CustomView
                width={"100%"}
                height={190}
                alignItems={'flex-start'}
                justifyContent={'flex-end'}
                paddingHorizontal={SPACING.huge}
                paddingVertical={SPACING.superHuge}
            >
                <CustomText fontSize={FONTS.size.head} textColor={COLORS.bng.primary} fontWeight={800}>
                    안녕하세요 {name ? name : "한유찬"}님!
                </CustomText>
                <CustomText fontSize={FONTS.size.title} textColor={COLORS.bng.primary} fontWeight={600}>
                    {time ? "어제의 공부시간은 " + time + "시간이었어요" : "아직 공부시간이 측정되지 않았어요"}, 오늘도 열심히 화이팅!
                </CustomText>
            </CustomView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: 190,
    },
});