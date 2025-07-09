import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
                    flexDirection: 'row',
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
        gap: SPACING.medium,
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