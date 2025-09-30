import modifyData from "@/assets/data/modify.json";

export function getWorkList(
    selectedSubject: string, 
    submitSubjectModule: { subject: string; publisher: string; work: string[] }[],
    schoolInfo: { school: string; grade: string } 
): string[] {
    
    const subjectModule = submitSubjectModule.find(
        module => module.subject === selectedSubject
    );

    if (!subjectModule?.publisher) {
        console.log('No subject module or publisher found');
        return [];
    }

    
    const { school, grade } = schoolInfo;
    let schoolLevel = grade;
    
    console.log('School Level:', schoolLevel);
    console.log('Subject:', selectedSubject);
    console.log('Publisher:', subjectModule.publisher);

    try {
        
        const schoolData = (modifyData as any)[schoolLevel];
        if (!schoolData) {
            console.log('No data for school level:', schoolLevel);
            return [];
        }

        const subjectData = schoolData[selectedSubject];
        if (!subjectData) {
            console.log('No data for subject:', selectedSubject);
            return [];
        }

        const publisherData = subjectData[subjectModule.publisher];
        if (!publisherData?.work) {
            console.log('No work data for publisher:', subjectModule.publisher);
            return [];
        }

        console.log('Found work data:', publisherData.work);
        return publisherData.work;
    } catch (error) {
        console.error('Error in getWorkList:', error);
        return [];
    }
}