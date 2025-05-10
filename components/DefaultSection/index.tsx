import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { SPACING } from "@/styles/spacing";
import { FONTS } from "@/styles/fonts";
import { COLORS } from "@/styles/colors";

interface IProps {
    title: string;
    children: any;
    titleLinkText?: string; // 링크 텍스트
    titleLink?: string; // 링크 URL
}

export default function DefaultSection(props: IProps) {
    const { title, children, titleLinkText, titleLink } = props;

    const handleLinkTextClick = () => {
        if (titleLink) {
            Linking.openURL(titleLink).catch(err =>
                console.error("Failed to open URL:", err)
            );
        }
    };

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
                {titleLinkText && (
                    <TouchableOpacity onPress={handleLinkTextClick}>
                        <Text style={styles.linkText}>{titleLinkText}</Text>
                    </TouchableOpacity>
                )}
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