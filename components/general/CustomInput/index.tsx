import {Input} from "postcss";
import CustomView from "@/components/general/CustomView";
import {TextInput} from "react-native";
import {StyleSheet} from "react-native";
import {SPACING} from "@/styles/spacing";
import {FONTS} from "@/styles/fonts";

interface IProps {
    width ?: any,
    height ?: number,
    placeholder : string,
}

export default function CustomInput(props : IProps) {
    const {width, height, placeholder} = props;
    return (
        <TextInput style={[{ width: width, height: height, fontSize:FONTS.size.small }, styles.container]} placeholder={placeholder}/>
    )
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderWidth: 1,
        padding:SPACING.tiny,
        borderColor: 'rgba(54,54,54,0.1)',
        borderRadius: SPACING.tiny
    }
})