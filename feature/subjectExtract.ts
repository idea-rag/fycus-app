import modifyData from "@/assets/data/modify.json";

export function getWorkList(
    selectedSubject: string, 
    submitSubjectModule: { subject: string; publisher: string; work: string[] }[],
    schoolInfo: { school: string; grade: string } // 새로 추가된 파라미터
): string[] {
    // 1. 선택된 과목 모듈 찾기
    const subjectModule = submitSubjectModule.find(
        module => module.subject === selectedSubject
    );

    if (!subjectModule?.publisher) {
        console.log('No subject module or publisher found');
        return [];
    }

    // 2. 학교 레벨 결정
    let schoolLevel = '';
    const { school, grade } = schoolInfo;
    
    if (school.includes('고등학교')) {
        schoolLevel = 'highschool-' + grade;
    } else if (school.includes('중학교')) {
        schoolLevel = 'middleschool-' + grade;
    } else {
        schoolLevel = 'elementary-' + grade;
    }

    console.log('School Level:', schoolLevel);
    console.log('Subject:', selectedSubject);
    console.log('Publisher:', subjectModule.publisher);

    try {
        // 3. modify.json에서 데이터 조회
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