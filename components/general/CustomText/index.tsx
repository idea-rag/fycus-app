import { Text, TextStyle } from "react-native";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    textColor?: string;
    fontSize?: number;
    fontWeight?: TextStyle["fontWeight"];
    style?: any;
}

export default function CustomText(props: IProps) {
    const { children, textColor, fontSize, fontWeight, style } = props;
    return (
        <Text style={{ color: textColor, fontSize, fontWeight, ...style }}>
            {children}
        </Text>
    );
}
