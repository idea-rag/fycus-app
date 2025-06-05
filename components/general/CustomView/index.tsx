import { TouchableOpacity } from "react-native";

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
    onPress?: () => void;
}

export default function CustomView(props: IProps) {
    const {children, style, width, height, justifyContent, alignItems, flexDirection, gap, paddingVertical, paddingHorizontal, borderRadius, onPress} = props;
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.7 : 1}
            onPress={onPress}
            style={{
                width: width,
                height: height,
                display:'flex',
                justifyContent: justifyContent,
                alignItems: alignItems,
                flexDirection: flexDirection ? flexDirection : 'column',
                gap: gap,
                paddingVertical: paddingVertical,
                paddingHorizontal: paddingHorizontal,
                borderRadius: borderRadius,
                ...style
            }}
        >
            {children}
        </TouchableOpacity>
    )
}
