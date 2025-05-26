import CustomView from "@/components/general/CustomView";
import {SPACING} from "@/styles/spacing";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";
import {ScrollView} from "react-native";
import BluetoothCard from "@/components/Onboard/BluetoothCard";

export default function Forth() {
    return (
        <CustomView style={{flex : 1}} alignItems={'center'} justifyContent={'center'}>
            <CustomView
                width={'75%'}
                height={400}
                paddingHorizontal={SPACING.medium}
                paddingVertical={SPACING.medium}
                alignItems={'center'}
                justifyContent={'flex-start'}
                flexDirection={'column'}
                gap={SPACING.small}
            >
                <CustomText fontSize={FONTS.size.body}>bluetooth</CustomText>
                <ScrollView>
                    <BluetoothCard name={'test'} isConnected={false}/>
                </ScrollView>
            </CustomView>
        </CustomView>
    )
}