import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { StyleSheet, TextInput } from "react-native";

interface IProps {
    width?: any;
    height?: number;
    placeholder: string;
    onValueChange?: (value: string) => void; 
    onValueReturn?: any;
    secureTextEntry?: boolean;
}

export default function CustomInput(props: IProps) {
    const { width, height, placeholder, onValueChange, onValueReturn } = props;

    const handleChange = (text: string) => {
        if (onValueChange) {
            onValueChange(text); 
        }
    };

    return (
        <TextInput
            style={[
                { width: width, height: height, fontSize: FONTS.size.small },
                styles.container
            ]}
            placeholder={placeholder}
            onChangeText={handleChange} 
            secureTextEntry={props.secureTextEntry} 
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