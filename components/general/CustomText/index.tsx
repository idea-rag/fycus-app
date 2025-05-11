import {Text,TextStyle} from "react-native";

interface IProps {
    text: string;
    textColor?: string;
    fontSize?: number;
    fontWeight?: TextStyle["fontWeight"];
}

export default function CustomText(props: IProps){
    const {text, textColor, fontSize, fontWeight} = props;
    return (
        <Text style={{color: textColor, fontSize : fontSize, fontWeight : fontWeight}}>
            {text}
        </Text>
    )
}