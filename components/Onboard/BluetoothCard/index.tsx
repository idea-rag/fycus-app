import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { FontAwesome } from "@expo/vector-icons";
    
interface IProps {
    id: string,
    name: string,
    isConnected: boolean,
    onPress?: (id: string) => void;
}

export default function BluetoothCard(props: IProps) {
    const { id, name, isConnected, onPress } = props;
    let nameSlice = name;
    if (name.length > 10) {
        nameSlice = name.slice(0, 10) + '...';
    }
    return (
            <CustomView
                width={'100%'}
                paddingHorizontal={SPACING.tiny}
                paddingVertical={SPACING.tiny}
                alignItems={'center'}
                justifyContent={'flex-start'}
                flexDirection={'row'}
                gap={SPACING.tiny}
                style={{ boxShadow: '0px 2px 2px rgba(0,0,0,0.05)' }}
                onPress={() => {
                    onPress && onPress(id);
                }}
            >
                <FontAwesome name={'headphones'} size={24} />
                <>
                    <CustomText>{nameSlice}</CustomText>
                    {isConnected && <CustomText style={{ color: COLORS.state.correct }} fontSize={FONTS.size.small}>연결됨</CustomText>}
                    {!isConnected && <CustomText style={{ color: COLORS.state.uncorrect }} fontSize={FONTS.size.small}>연결 안됨</CustomText>}
                </>
            </CustomView>
    );
}