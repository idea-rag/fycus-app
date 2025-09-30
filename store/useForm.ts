import { create } from "zustand";

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
    submitFocusSubject: string;
    submitWhatWeek: number;
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
    submitFocusSubjectSetter: (submitFocusSubject: string) => void;
    submitWhatWeekSetter: (submitWhatWeek: number) => void;
    submitStartTimeSetter: (submitStartTime: string) => void;
    submitEndTimeSetter: (submitEndTime: string) => void;
}

const useFormStore = create<FormState>((set) => ({
    
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
    submitFocusSubject: '',
    submitWhatWeek: 0,
    submitStartTime: '',
    submitEndTime: '',
    
    // Add setFormData function
    setFormData: (data: Partial<FormState>) => set((state) => ({ ...state, ...data })),

    
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
    submitFocusSubjectSetter: (submitFocusSubject: string) => set({ submitFocusSubject }),
    submitWhatWeekSetter: (submitWhatWeek: number) => set({ submitWhatWeek }),
    submitStartTimeSetter: (submitStartTime: string) => set({ submitStartTime }),
    submitEndTimeSetter: (submitEndTime: string) => set({ submitEndTime }),
}));

export default useFormStore;