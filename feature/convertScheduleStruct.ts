import useFormStore from "@/store/useForm";

interface SubjectModule {
  subject: string;
  publisher: string;
  work: string[];
}

export default function convertScheduleStruct() {
  //@ts-ignore
  const { submitSubjectModule, submitGrade, submitFocusSubject, submitWhatWeek } = useFormStore();
  
  const transformData = () => {
    // Format subjects array from submitSubjectModule
    const subjects = submitSubjectModule.map((module: SubjectModule) => ({
      grade: submitGrade[0], // Assuming submitGrade is an array, taking the first item
      publish: module.publisher,
      workbook: module.subject,
      work: module.work || [] // Ensure work is an array even if undefined
    }));

    // Create the final transformed object
    const transformedData = {
      when: submitWhatWeek,
      subjects,
      goal: submitFocusSubject
    };

    return transformedData;
  };

  return transformData();
}
