import CustomInput from "@/components/general/CustomInput";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import NextButton from "@/components/Onboard/NextButton";
import useFormStore from "@/store/useForm";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useState } from "react";

interface IProps {
    onNext: () => void;
}

export default function Name({ onNext }: IProps) {
    const [name, setName] = useState('');
    //@ts-ignore
    const { submitNameSetter } = useFormStore();

    const handleNameChange = (text : string) => {
        setName(text);
    }

    const handleSubmit = () => {
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
               <NextButton onPress={handleSubmit}/>

            </CustomView>
    )
}