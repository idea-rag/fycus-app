import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { StyleSheet, View } from "react-native";

interface SubjectSectionCardProps {
    subject: string;
    bookTitle: string;
    pageRange: string;
}

export default function SubjectSectionCard({ subject, bookTitle, pageRange }: SubjectSectionCardProps) {
    return (
        <CustomView style={styles.cardContainer}>
            <CustomText style={styles.subject}>{subject}</CustomText>
            <View style={styles.imagePlaceholder} />
            <CustomText style={styles.bookTitle} textColor={COLORS.text.primary}>{bookTitle}</CustomText>
            <CustomText style={styles.pageRange} textColor={COLORS.text.second}>{pageRange}</CustomText>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '30%',
        marginBottom: 20,
        alignItems: 'flex-start',
        gap : 4
    },
    subject: {
        fontSize: 14,
    },
    imagePlaceholder: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#D9D9D9',
    },
    bookTitle: {
        fontSize: 14,
    },
    pageRange: {
        fontSize: 12,
    },
});