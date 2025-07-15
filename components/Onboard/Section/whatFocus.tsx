import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { FONTS } from "@/styles/fonts";

export default function WhatFocus() {
    return (
        <CustomView
            alignItems={'center'}
            justifyContent={'center'}
            style={{flex : 1}}
            width={'100%'}
            height={'100%'}
        >
            <CustomText fontSize={FONTS.size.body}>어느 과목에 더욱 집중하고 싶나요?</CustomText>
        </CustomView>
    )
}   