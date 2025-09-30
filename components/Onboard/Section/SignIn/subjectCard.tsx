import modifyData from "@/assets/data/modify.json";
import CustomScrollView from "@/components/general/CustomScrollView";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useFormStore from "@/store/useForm";
import { SPACING } from "@/styles/spacing";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

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
    onPublisherSelect?: (publisher: string) => void;
}

export default function SubjectCard(props: IProps) {
    const {name} = props;
    //@ts-ignore
    const {submitGrade, submitSchool} = useFormStore();
    const [filterSubjectName, setFilterSubjectName] = useState('')
    const [subjectData, setSubjectData] = useState<SubjectData>(null)
    
    useEffect(() => {
        if (!submitSchool || !submitGrade) {
            console.log('School or grade not set yet', { submitSchool, submitGrade });
            return;
        }

        let schoolType;
        if (submitSchool.includes('고등학교')) {
            schoolType = 'highschool';
        } else if (submitSchool.includes('중학교')) {
            schoolType = 'middleschool';
        } else {
            schoolType = 'elementary';
        }

        const newFilterName = `${submitGrade}`;
        console.log('Setting filterSubjectName to:', newFilterName);
        setFilterSubjectName(newFilterName);
    }, [submitGrade, submitSchool]);

    useEffect(() => {
        if (!filterSubjectName) {
            console.log('filterSubjectName is not set yet');
            return;
        }
        
        console.log('filterSubjectName:', filterSubjectName);
        console.log('Current subject name:', name);
        
        //@ts-ignore
        const gradeData = modifyData[filterSubjectName];
        
        if (!gradeData) {
            console.log('No grade data found for:', filterSubjectName);
            console.log('Available keys:', Object.keys(modifyData));
            setSubjectData(null);
            return;
        }
        
        console.log('Found grade data for:', filterSubjectName);
        
        const subjects = Object.entries(gradeData).map(([subject, publishers]) => {
            const publisherEntries = Object.entries(publishers as Record<string, { work: string[] }>);
            return {
                subject,
                publishers: publisherEntries.map(([publisher, data]) => ({
                    publisher,
                    work: data.work
                }))
            };
        });
        
        console.log('All subjects in grade:', subjects.map(s => s.subject));
        const foundSubject = subjects.find(item => item.subject === name);
        console.log('Found subject data for', name + ':', foundSubject);
        
        setSubjectData(foundSubject || null);
    }, [filterSubjectName, name])



    
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
                            <TouchableOpacity onPress={() => props.onPublisherSelect?.(publisher.publisher)}>   
                                <CustomText>{publisher.publisher}</CustomText>
                            </TouchableOpacity>
                        </CustomView>
                    ))}
                </CustomView>
            )}
        </CustomScrollView>
    )
}