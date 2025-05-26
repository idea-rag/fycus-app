import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import {SPACING} from "@/styles/spacing";
import {FONTS} from "@/styles/fonts";
import {COLORS} from "@/styles/colors";

interface IProps {
    name : string,
    locate : string,
}

export default function SchoolCard(props : IProps) {
    const {name, locate} = props;
    return (
        <CustomView
            width={'100%'}
            borderRadius={SPACING.superTiny}
            justifyContent={'center'}
            alignItems={'flex-start'}
            gap={SPACING.superTiny}
        >
            <CustomText
                fontSize={FONTS.size.body}
                textColor={COLORS.text.primary}
            >{name}</CustomText>
            <CustomText
                fontSize={FONTS.size.small}
                textColor={COLORS.text.fifth}
            >{locate}</CustomText>
        </CustomView>
    )
}