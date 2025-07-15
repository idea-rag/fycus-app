import modifyData from "@/assets/data/modify.json";
import CustomScrollView from "@/components/general/CustomScrollView";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useFormStore from "@/store/useForm";
import { SPACING } from "@/styles/spacing";
import { useEffect, useState } from "react";

type PublisherData = {
    publisher: string;
    work: string[];
}

type SubjectData = {
    subject: string;
    publishers: PublisherData[];
} | null;

interface IProps {
    name: string;
}

interface IProps {
    name : string;
}
    

export default function SubjectCard (props : IProps) {
    const {name} = props;
    //@ts-ignore
    const {submitGrade, submitSchool} = useFormStore();
    const [filterSubjectName, setFilterSubjectName] = useState('')
    const [subjectData, setSubjectData] = useState<SubjectData>(null)
    
    const filterData = () => {
        if (submitSchool.includes('고등학교')) {
            setFilterSubjectName('highschool-' + submitGrade)
        } else if (submitSchool.includes('중학교')) {
            setFilterSubjectName('middleschool-' + submitGrade)
        } else {
            setFilterSubjectName('elementary-' + submitGrade)
        }
    }

    useEffect(() => {
        filterData()
        //@ts-ignore
        const gradeData = modifyData[filterSubjectName] as Record<string, Record<string, { work: string[] }>>
        if (gradeData) {
            const formattedData = Object.entries(gradeData).map(([subject, publishers]) => ({
                subject,
                publishers: Object.entries(publishers).map(([publisher, data]) => ({
                    publisher,
                    work: data.work
                }))
            }))
            setSubjectData(formattedData.find(item => item.subject === name) || null)
        }
    }, [filterSubjectName])



    
    return (
        <CustomScrollView
        width={'100%'}
        height={'100%'}
        >
            {subjectData && (
                <CustomView gap={SPACING.medium}>
                    <CustomText>{name}</CustomText>
                    {subjectData.publishers.map((publisher, publisherIndex) => (
                        <CustomView key={publisherIndex} gap={SPACING.small}>
                            <CustomText>{publisher.publisher}</CustomText>
                            {/* {publisher.work.map((work, workIndex) => (
                                <CustomText key={workIndex}>{work}</CustomText>
                            ))} */}
                        </CustomView>
                    ))}
                </CustomView>
            )}
        </CustomScrollView>
    )
}