import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { batteryStep } from "@/feature/batteryStep";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface IProps {
    connection?: boolean;
    battery: number;
}

export default function HardwareSection(props: IProps) {
    const { connection, battery } = props;
    const batteryStepValue = batteryStep(battery);

    return (
        <CustomView
            gap={SPACING.medium}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            width='45%'
        >
            <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} >하드웨어</CustomText>
            <CustomView width={'100%'} alignItems={'center'} justifyContent={'center'}>
                <CustomView width={75} height={75} borderRadius={100} alignItems={'center'} justifyContent={'center'} style={styles.circle}>
                    <CustomText>a</CustomText>
                </CustomView>
            </CustomView>
            <CustomView width={'100%'} alignItems={'center'} justifyContent={'center'} flexDirection={'row'} gap={SPACING.small}>
                <CustomView flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={SPACING.superTiny}>
                    <FontAwesome name={`battery-${batteryStepValue}` as any} color={COLORS.text.third} size={12}/>
                    <CustomText fontSize={FONTS.size.small} textColor={COLORS.text.primary}>{battery}%</CustomText>
                </CustomView>
                <CustomView flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={SPACING.superTiny}>
                    <FontAwesome name={'link'} color={COLORS.text.third} size={12}/>
                    {connection ?
                        <CustomText fontSize={FONTS.size.small} textColor={COLORS.state.correct}>
                            양호
                        </CustomText>
                        :
                        <CustomText fontSize={FONTS.size.small} textColor={COLORS.state.uncorrect}>
                            연결 X
                        </CustomText>
                    }
                </CustomView>
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

