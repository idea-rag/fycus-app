import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { batteryStep } from "@/feature/batteryStep";
import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { StyleSheet } from "react-native";
import Status from "./status";

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
            style={styles.container}
        >
            <CustomText fontSize={18} textColor={COLORS.text.primary} fontWeight={700} >하드웨어</CustomText>
            <CustomView gap={SPACING.small} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                <CustomView width={75} height={75} borderRadius={100} alignItems={'center'} justifyContent={'center'} style={styles.circle}/>
                <CustomView gap={SPACING.small} alignItems={'flex-start'} justifyContent={'center'}>
                    <CustomText textColor={COLORS.text.primary} fontSize={14} fontWeight={600}> Fycus-hardware</CustomText>
                    <Status battery={battery} batteryStepValue={batteryStepValue} connection={connection ?? false}/>
                </CustomView>
            </CustomView>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',  
        backgroundColor: COLORS.bng.primary,
        borderRadius: SPACING.medium,
        paddingHorizontal: SPACING.small,
        paddingVertical: SPACING.small,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5, // 안드로이드에서의 그림자
    },
    circle:{
        borderWidth: 1,
        borderColor: '#E8E8E8',
    }
})

