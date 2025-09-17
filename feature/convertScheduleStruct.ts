
interface SubjectModule {
  subject: string;
  publisher: string;
  work: string[];
}

interface ConvertScheduleParams {
  submitSubjectModule: SubjectModule[];
  submitGrade: string[];
  submitFocusSubject: string;
  submitWhatWeek: number;
}

export default function convertScheduleStruct({
  submitSubjectModule,
  submitGrade,
  submitFocusSubject,
  submitWhatWeek
}: ConvertScheduleParams) {
  // Format subjects array from submitSubjectModule
  const subjects = submitSubjectModule.map((module: SubjectModule) => ({
    grade: submitGrade, // Assuming submitGrade is an array, taking the first item
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
}
