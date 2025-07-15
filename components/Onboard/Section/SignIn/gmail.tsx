import CustomInput from "@/components/general/CustomInput";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import NextButton from "@/components/Onboard/NextButton";
import useFormStore from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useState } from "react";

interface IProps {
    onNext: () => void;
}

export default function Gmail({ onNext }: IProps){
    const [gmail, setGmail] = useState('');
    const [errorText, setErrorText] = useState('');
    //@ts-ignore
    const { submitGmailSetter } = useFormStore();

    const handleGmailChange = (text : string) => {
        setGmail(text);
    }

    const handleSubmit = () => {
        if (!gmail) {
            setErrorText('이메일을 입력해주세요.');
            return;
        }
        submitGmailSetter(gmail);
        onNext();
    }
    return (    
        <CustomView
            width={322}
            alignItems={'center'}
            justifyContent={'center'}
            gap={SPACING.medium}
            flexDirection={'column'}
        >
            <CustomText fontSize={FONTS.size.body}>다음으로, 이메일을 입력해주세요</CustomText>
            <CustomInput placeholder={'이메일을 입력하세요...'} width={'100%'} onValueChange={handleGmailChange}/>
            <CustomText fontSize={FONTS.size.small} textColor={COLORS.state.uncorrect} fontWeight={600}>{errorText}</CustomText>
            <NextButton onPress={handleSubmit}/>
        </CustomView>
    )
}