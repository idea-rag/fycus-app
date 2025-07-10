import { ScrollView } from "react-native";

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

export default function CustomScrollView(props: IProps) {
    const {children, style, width, height, justifyContent, alignItems, flexDirection, gap, paddingVertical, paddingHorizontal, borderRadius} = props;
    return (
        <ScrollView
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
        </ScrollView>
    )
}
