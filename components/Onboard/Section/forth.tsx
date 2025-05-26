import CustomView from "@/components/general/CustomView";
import {SPACING} from "@/styles/spacing";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";
import {ScrollView} from "react-native";
import BluetoothCard from "@/components/Onboard/BluetoothCard";
import CustomInput from "@/components/general/CustomInput";

export default function Forth() {
    return (
        <CustomView style={{flex : 1, width: '100%'}} alignItems={'center'} justifyContent={'center'}>
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
                <BluetoothCard name={'test'} isConnected={false}/>
                <CustomInput width={'100%'} height={40} placeholder={'이름을 입력하세요...'}/>
            </CustomView>
        </CustomView>
    )
}