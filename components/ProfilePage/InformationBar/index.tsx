import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";

interface IProps {
    title : string;
    text : string;
}

export default function InformationBar(props : IProps) {
    const {title, text} = props;
    return (
        <CustomView
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'100%'}
        >
            <CustomText
                fontSize={18}
                textColor={COLORS.text.primary}
                fontWeight={'600'}
            >{title}</CustomText>
            <CustomText
                fontSize={FONTS.size.body}
                textColor={COLORS.text.second}
                fontWeight={'400'}
            >{text}</CustomText>
        </CustomView>
    );
}