import CustomView from "@/components/general/CustomView";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { SPACING } from "@/styles/spacing";
import { FONTS } from "@/styles/fonts";

interface IProps {
    width?: any;
    height?: number;
    placeholder: string;
    onValueChange?: (value: string) => void; // 값을 반환하는 콜백 함수
    onValueReturn?: any;
}

export default function CustomInput(props: IProps) {
    const { width, height, placeholder, onValueChange, onValueReturn } = props;

    const handleChange = (text: string) => {
        if (onValueChange) {
            onValueChange(text); // 상위 컴포넌트로 값 전달
        }
    };

    return (
        <TextInput
            style={[
                { width: width, height: height, fontSize: FONTS.size.small },
                styles.container
            ]}
            placeholder={placeholder}
            onChangeText={handleChange} // 값 변경 시 호출
        />
    );
}

const styles = StyleSheet.create({
    container: {
        borderStyle: "solid",
        borderWidth: 1,
        padding: SPACING.tiny,
        borderColor: "rgba(54,54,54,0.1)",
        borderRadius: SPACING.tiny
    }
});