import {View} from "react-native";
import {StyleSheet} from "react-native";

interface IProps {
    children?: any;
    style?: any;
    width?: any;
    height?: any;
    justifyContent?: any;
    alignItems?: any;
    flexDirection?: any;
    gap?: number;
    paddingVertical?: any;
    paddingHorizontal?: any;
    borderRadius?: number;
}

export default function CustomView(props: IProps) {
    const {children, style, width, height, justifyContent, alignItems, flexDirection, gap, paddingVertical, paddingHorizontal, borderRadius} = props;
    return (
        <View
            style={{
                width: width,
                height: height,
                display:'flex',
                justifyContent: justifyContent,
                alignItems: alignItems,
                flexDirection: flexDirection ? flexDirection : 'row',
                gap: gap,
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal,
                borderRadius: borderRadius,
                ...style
            }}
        >
            {children}
        </View>
    )
}
