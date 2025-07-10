import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

interface IProps {
    title : string;
    children : React.ReactNode;
}

export default function SectionDefault(props : IProps) {
    const {title, children} = props;
    return (
        <CustomView
        paddingVertical={SPACING.tiny}
        gap={SPACING.small}
        alignItems={'flex-start'}
        justifyContent={'flex-start'}
        >
            <CustomText fontSize={FONTS.size.title} textColor={COLORS.text.primary} fontWeight={'700'}>
                {title}
            </CustomText>
            {children}
        </CustomView>
    );
}   