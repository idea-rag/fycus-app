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

export default function Password({ onNext }: IProps) {
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    //@ts-ignore
    const { submitPasswordSetter, submitPassword } = useFormStore();

    const handlePasswordChange = (text : string) => {
        setPassword(text);
    }

    const handleSubmit = () => {
        
        if (!password) {
            setErrorText('비밀번호를 입력해주세요.');
            return;
        }

        
        if (password.length < 8) {
            setErrorText('비밀번호는 8자 이상이어야 합니다.');
            return;
        } else if (password.length > 16) {
            setErrorText('비밀번호는 16자 이하이어야 합니다.');
            return;
        }

        
        
        
        
        
        

        
        submitPasswordSetter(password);
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
                <CustomText fontSize={FONTS.size.body}>다음으로, 비밀번호를 입력해주세요</CustomText>
                <CustomInput 
                    placeholder={'비밀번호를 입력하세요...'} 
                    width={'100%'} 
                    onValueChange={handlePasswordChange}
                    secureTextEntry={true}
                />
                <CustomText fontSize={FONTS.size.small} textColor={COLORS.state.uncorrect} fontWeight={600}>{errorText}</CustomText>
                <NextButton onPress={handleSubmit}/>
            </CustomView>
        )
}