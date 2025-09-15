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
                    gap: 6,
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
        backgroundColor: COLORS.bng.primary,
        paddingHorizontal: SPACING.small,
        paddingVertical: SPACING.small,
        gap: SPACING.superTiny,
        borderRadius: SPACING.medium,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.07,
        shadowRadius: 3.84,
        elevation: 5, // 안드로이드에서의 그림자
    },
    title: {
        fontSize: 18,
        color: COLORS.text.primary,
        fontWeight: "700",
    },
    linkText: {
        fontSize: FONTS.size.small,
        color: COLORS.brand.primary,
        fontWeight: "600",
    },
});