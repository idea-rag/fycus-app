import CustomView from "@/components/general/CustomView";
import {FontAwesome} from "@expo/vector-icons";
import CustomText from "@/components/general/CustomText";
import {FONTS} from "@/styles/fonts";
import {COLORS} from "@/styles/colors";
import {SPACING} from "@/styles/spacing";

interface IProps {
    name : string,
    isConnected : boolean,
}

export default function BluetoothCard(props : IProps) {
    const {name, isConnected} = props;
    return (
        <CustomView
            width={'100%'}
            paddingHorizontal={SPACING.tiny}
            paddingVertical={SPACING.tiny}
            alignItems={'center'}
            justifyContent={'flex-start'}
            flexDirection={'row'}
            gap={SPACING.tiny}
            style={{boxShadow : '0px 4px 4px rgba(0,0,0,0.05)'}}
        >
            <FontAwesome name={'headphones'}/>
            <>
                <CustomText fontSize={FONTS.size.small}>{name}</CustomText>
                <CustomText fontSize={8} style={isConnected ? { color : COLORS.state.correct} : {color: COLORS.text.third}}>{isConnected ? '연결됨' : '연결 안됨'}</CustomText>
            </>
        </CustomView>
    )
}