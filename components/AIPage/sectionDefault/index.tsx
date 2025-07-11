import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

interface IProps{
    title : string
    children : any
}

export default function SectionDefault(props : IProps) {
    const {title, children} = props
    return(
        <CustomView
            width={'100%'}
            gap={SPACING.small}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            paddingHorizontal={SPACING.medium}
            style={{marginBottom : SPACING.medium}}
        >
            <CustomText
                fontSize={FONTS.size.body}
                fontWeight={600}
            >
                {title}
            </CustomText>
            {children}
        </CustomView>
    )
}