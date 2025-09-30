import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useSFormStore from "@/store/useForm";
import { StyleSheet } from "react-native";
import SubjectSectionCard from "./card";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";


export default function SubjectSection() {
    
    //@ts-ignore
    const {submitSubjectModule} = useSFormStore();

    return (
        <CustomView style={styles.container}>
            <CustomText style={styles.title}>공부 범위</CustomText>
            <CustomView style={styles.gridContainer}>
                {submitSubjectModule.map((item :{subject : string, publisher : string, work : string[]}, index : number) => (
                    <>
                    <SubjectSectionCard
                        key={index}
                        subject={item.subject}
                        bookTitle={item.publisher}
                    />
                    <CustomText
                        fontSize={FONTS.size.small}
                        textColor={COLORS.text.second}
                        fontWeight={500}
                    >
                        {item.work.join(', ')}
                    </CustomText>
                    </>
                ))}
            </CustomView>
        </CustomView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    gridContainer: {
        width: '100%',
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 'auto',
        justifyContent: 'flex-start',
        gap : 12,
    }
});