import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { StyleSheet, View } from "react-native";

interface SubjectSectionCardProps {
    subject: string;
    bookTitle: string;
}

export default function SubjectSectionCard({ subject, bookTitle }: SubjectSectionCardProps) {
    return (
        <CustomView style={styles.cardContainer}>
            <CustomText style={styles.subject}>{subject}</CustomText>
            <CustomText style={styles.bookTitle} textColor={COLORS.text.primary}>{bookTitle}</CustomText>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        gap : 4
    },
    subject: {
        fontSize: 16,
        fontWeight: '700',
    },
    bookTitle: {
        fontSize: 14,
    },
});