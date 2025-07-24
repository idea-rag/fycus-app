import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useSFormStore from "@/store/useForm";
import { StyleSheet } from "react-native";
import SubjectSectionCard from "./card";


const mockData = [
    { subject: "국어", bookTitle: "금성 - 문학2" },
    { subject: "국어", bookTitle: "금성 - 문학2", },
    { subject: "국어", bookTitle: "금성 - 문학2", },
    { subject: "국어", bookTitle: "금성 - 문학2", },
    { subject: "국어", bookTitle: "금성 - 문학2", },
    { subject: "국어", bookTitle: "금성 - 문학2", },
];


export default function SubjectSection() {
    
    //@ts-ignore
    const {submitSubjectModule} = useSFormStore();

    return (
        <CustomView style={styles.container}>
            <CustomText style={styles.title}>공부 범위</CustomText>
            <CustomView style={styles.gridContainer}>
                {submitSubjectModule.map((item :{subject : string, publisher : string, work : string[]}, index : number) => (
                    <SubjectSectionCard
                        key={index}
                        subject={item.subject}
                        bookTitle={item.publisher}
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