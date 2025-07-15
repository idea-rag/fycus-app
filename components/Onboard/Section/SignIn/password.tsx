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
        // 비밀번호 입력 여부 확인
        if (!password) {
            setErrorText('비밀번호를 입력해주세요.');
            return;
        }

        // 길이 검증 (8-16자)
        if (password.length < 8) {
            setErrorText('비밀번호는 8자 이상이어야 합니다.');
            return;
        } else if (password.length > 16) {
            setErrorText('비밀번호는 16자 이하이어야 합니다.');
            return;
        }

        // 정규표현식 검증 (영문, 숫자, 특수문자 포함)
        // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
        // if (!passwordRegex.test(password)) {
        //     setErrorText('비밀번호는 영문, 숫자, 특수문자 조합으로 입력해주세요.');
        //     return;
        // }

        // 모든 검증 통과 시 저장 및 다음 페이지로 이동
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