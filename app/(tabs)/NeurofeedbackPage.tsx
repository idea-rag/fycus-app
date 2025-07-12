import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import PageDefault from "@/components/general/PageDefault";
import { COLORS } from '@/styles/colors';
import { FONTS } from '@/styles/fonts';
import { SPACING } from '@/styles/spacing';
import { useEffect } from 'react';
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
export default function NeurofeedbackPage() {
    const translateX = useSharedValue(100); // 시작 위치 (오른쪽에서)
    const opacity = useSharedValue(0); // 시작 투명도

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        // 컴포넌트가 마운트되면 애니메이션 시작
        translateX.value = withTiming(0, {
            duration: 800,
            easing: Easing.out(Easing.ease),
        });
        
        opacity.value = withTiming(1, {
            duration: 1000,
            easing: Easing.out(Easing.ease),
        });
    }, []);

    return (
        <PageDefault title={'뉴로피드백'}>
            <CustomView
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                paddingHorizontal={SPACING.medium}
                style={{flex : 1}}
            >
                <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600} style={animatedStyle}>
                    지금부터, 집중력 향상 훈련을 시작하겠습니다.
                </CustomText>
            </CustomView>
        </PageDefault>
    );
}