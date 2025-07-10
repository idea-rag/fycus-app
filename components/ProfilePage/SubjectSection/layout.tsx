import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { StyleSheet } from "react-native";
import SubjectSectionCard from "./card";

const mockData = [
    { subject: "국어", bookTitle: "금성 - 문학2", pageRange: "100P~150P" },
    { subject: "국어", bookTitle: "금성 - 문학2", pageRange: "100P~150P" },
    { subject: "국어", bookTitle: "금성 - 문학2", pageRange: "100P~150P" },
    { subject: "국어", bookTitle: "금성 - 문학2", pageRange: "100P~150P" },
    { subject: "국어", bookTitle: "금성 - 문학2", pageRange: "100P~150P" },
    { subject: "국어", bookTitle: "금성 - 문학2", pageRange: "100P~150P" },
];

export default function SubjectSection() {
    return (
        <CustomView style={styles.container}>
            <CustomText style={styles.title}>시험범위</CustomText>
            <CustomView style={styles.gridContainer}>
                {mockData.map((item, index) => (
                    <SubjectSectionCard
                        key={index}
                        subject={item.subject}
                        bookTitle={item.bookTitle}
                        pageRange={item.pageRange}
                    />
                ))}
            </CustomView>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    container: {    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
});