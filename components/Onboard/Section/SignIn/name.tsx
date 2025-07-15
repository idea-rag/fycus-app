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

export default function Name({ onNext }: IProps) {
    const [name, setName] = useState('');
    const [errorText, setErrorText] = useState('');
    //@ts-ignore
    const { submitNameSetter } = useFormStore();

    const handleNameChange = (text : string) => {
        setName(text);
    }

    const handleSubmit = () => {
        if (!name) {
            setErrorText('이름을 입력해주세요.');
            return;
        }
        submitNameSetter(name);
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
                <CustomText fontSize={FONTS.size.body}>먼저, 이름을 입력해주세요</CustomText>
                <CustomInput placeholder={'이름을 입력하세요...'} width={'100%'} onValueChange={handleNameChange}/>
                <CustomText fontSize={FONTS.size.small} textColor={COLORS.state.uncorrect} fontWeight={600}>{errorText}</CustomText>
               <NextButton onPress={handleSubmit}/>

            </CustomView>
    )
}