import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { StyleSheet } from "react-native";
import Status from "./status";
import { Headset } from "lucide-react-native";

interface IProps {
    connection?: boolean;
}

export default function HardwareSection(props: IProps) {
    const { connection } = props;

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
                <CustomView width={75} height={75} borderRadius={100} alignItems={'center'} justifyContent={'center'}>
                    <Headset size={36} strokeWidth={1.5} />
                </CustomView>
                <CustomView gap={SPACING.small} alignItems={'flex-start'} justifyContent={'center'}>
                    <CustomText textColor={COLORS.text.primary} fontSize={14} fontWeight={600}> Fycus-hardware</CustomText>
                    <Status connection={connection ?? false}/>
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
})

