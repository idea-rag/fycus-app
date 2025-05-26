import CustomView from "@/components/general/CustomView";
import CustomText from "@/components/general/CustomText";
import CustomInput from "@/components/general/CustomInput";
import CustomButton from "@/components/general/CustomButton";
import {COLORS} from "@/styles/colors";
import {SPACING} from "@/styles/spacing";
import {FONTS} from "@/styles/fonts";
import NextButton from "@/components/Onboard/NextButton";
import {useState} from "react";
import useForm from "@/store/useForm";
import useFormStore from "@/store/useForm";

export default function Name(){
    const [name, setName] = useState('');
    //@ts-ignore
    const { submitNameSetter } = useFormStore();

    const handleNameChange = (text : string) => {
        setName(text);
    }

    const handleSubmit = () => {
        submitNameSetter(name);
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