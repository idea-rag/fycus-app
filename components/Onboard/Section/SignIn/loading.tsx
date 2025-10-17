import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import Logo from "@/components/general/Logo";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";

interface IProps {
    onNext: () => void;
}

export default function Loading(props: IProps) {
    const { onNext } = props;
    const [loadingText, setLoadingText] = useState('회원가입 중...');
    const scaleValue = new Animated.Value(1);

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                })
            ])
        ).start();
    };

    useEffect(() => {
        startPulseAnimation();
        
        const textTimer = setTimeout(() => {
            setLoadingText('회원가입 완료!');
        }, 2500);
        
        const navigateTimer = setTimeout(() => {
            onNext();
        }, 4000);
        
        return () => {
            clearTimeout(textTimer);
            clearTimeout(navigateTimer);
            scaleValue.stopAnimation();
        };
    }, [onNext]);

    const animatedStyle = {
        transform: [{ scale: scaleValue }],
    };

    return (
        <CustomView
            alignItems={'center'}
            justifyContent={'center'}
            style={{flex: 1}}
            width={'100%'}
            height={'100%'}
            gap={SPACING.huge}
        >
            <Animated.View style={animatedStyle}>
                <Logo width={60} height={60} />
            </Animated.View>
            <CustomText fontSize={FONTS.size.body} fontWeight={500}>{loadingText}</CustomText>
        </CustomView>
    )
}   