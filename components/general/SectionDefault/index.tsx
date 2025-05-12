import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { SPACING } from "@/styles/spacing";
import { FONTS } from "@/styles/fonts";
import { COLORS } from "@/styles/colors";

interface IProps {
    title: string;
    children: any;
    onHandleLinkTextClick?: () => void;
    titleLinkText?: string;
}

export default function SectionDefault(props: IProps) {
    const { title, children, onHandleLinkTextClick, titleLinkText} = props;

    return (
        <View style={styles.container}>
            <View
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: SPACING.superTiny,
                    flexDirection: 'row'
                }}
            >
                <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={onHandleLinkTextClick}>
                        <Text style={styles.linkText}>{titleLinkText}</Text>
                    </TouchableOpacity>
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: SPACING.medium,
        paddingVertical: SPACING.superTiny,
        gap: SPACING.superTiny,
    },
    title: {
        fontSize: FONTS.size.body,
        color: COLORS.text.primary,
    },
    linkText: {
        fontSize: FONTS.size.small,
        color: COLORS.brand.primary,
    },
});