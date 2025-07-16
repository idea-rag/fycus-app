import { create } from "zustand/react";

interface FormState {
    submitName: string;
    submitSchool: string;
    submitGrade: string;
    submitGmail: string;
    submitSubject: string[];
    submitPassword: string;
    submitPublishers: string[];
    submitBookList: string[];
    submitFocusGrade: string[];
    submitSubjectModule: {
        subject: string;
        publisher: string;
        work: string[];
    }[];
    submitStartTime: string;
    submitEndTime: string;

    submitNameSetter: (submitName: string) => void;
    submitSchoolSetter: (submitSchool: string) => void;
    submitGradeSetter: (submitGrade: string) => void;
    submitGmailSetter: (submitGmail: string) => void;
    submitSubjectSetter: (submitSubject: string[]) => void;
    submitPasswordSetter: (submitPassword: string) => void;
    submitPublishersSetter: (submitPublishers: string[]) => void;
    submitBookListSetter: (submitBookList: string[]) => void;
    submitFocusGradeSetter: (submitFocusGrade: string[]) => void;
    submitSubjectModuleSetter: (submitSubjectModule: { subject: string; publisher: string; work: string[] }[]) => void;
    submitStartTimeSetter: (submitStartTime: string) => void;
    submitEndTimeSetter: (submitEndTime: string) => void;
}

const useFormStore = create((set) => ({
    // State variables with "submit" prefix
    submitName: '',
    submitSchool: '',
    submitGrade: '',
    submitGmail: '',
    submitSubject: [],
    submitPassword: '',
    submitPublishers: [],
    submitBookList: [],
    submitFocusGrade: [],
    submitSubjectModule: [],
    submitStartTime: '',
    submitEndTime: '',

    // Setter functions with "submit" prefix
    submitNameSetter: (submitName: string) => set({ submitName }),
    submitSchoolSetter: (submitSchool: string) => set({ submitSchool }),
    submitGradeSetter: (submitGrade: string) => set({ submitGrade }),
    submitGmailSetter: (submitGmail: string) => set({ submitGmail }),
    submitSubjectSetter: (submitSubject: string[]) => set({ submitSubject }),
    submitPasswordSetter: (submitPassword: string) => set({ submitPassword }),
    submitPublishersSetter: (submitPublishers: string[]) => set({ submitPublishers }),
    submitBookListSetter: (submitBookList: string[]) => set({ submitBookList }),
    submitFocusGradeSetter: (submitFocusGrade: string[]) => set({ submitFocusGrade }),
    submitSubjectModuleSetter: (submitSubjectModule: { subject: string; publisher: string; work: string[] }[]) => set({ submitSubjectModule }),
    submitStartTimeSetter: (submitStartTime: string) => set({ submitStartTime }),
    submitEndTimeSetter: (submitEndTime: string) => set({ submitEndTime }),
}));

export default useFormStore;