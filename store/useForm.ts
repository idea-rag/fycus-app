import { create } from "zustand/react";

interface FormState {
    submitName: string;
    submitSchool: string;
    submitGrade: string;
    submitSubject: string[];
    submitBookList: string[];
    submitFocusGrade: string[];
    submitStartTime: string;
    submitEndTime: string;

    submitNameSetter: (submitName: string) => void;
    submitSchoolSetter: (submitSchool: string) => void;
    submitGradeSetter: (submitGrade: string) => void;
    submitSubjectSetter: (submitSubject: string[]) => void;
    submitBookListSetter: (submitBookList: string[]) => void;
    submitFocusGradeSetter: (submitFocusGrade: string[]) => void;
    submitStartTimeSetter: (submitStartTime: string) => void;
    submitEndTimeSetter: (submitEndTime: string) => void;
}

const useFormStore = create((set) => ({
    // State variables with "submit" prefix
    submitName: '',
    submitSchool: '',
    submitGrade: '',
    submitSubject: [],
    submitBookList: [],
    submitFocusGrade: [],
    submitStartTime: '',
    submitEndTime: '',

    // Setter functions with "submit" prefix
    submitNameSetter: (submitName: string) => set({ submitName }),
    submitSchoolSetter: (submitSchool: string) => set({ submitSchool }),
    submitGradeSetter: (submitGrade: string) => set({ submitGrade }),
    submitSubjectSetter: (submitSubject: string[]) => set({ submitSubject }),
    submitBookListSetter: (submitBookList: string[]) => set({ submitBookList }),
    submitFocusGradeSetter: (submitFocusGrade: string[]) => set({ submitFocusGrade }),
    submitStartTimeSetter: (submitStartTime: string) => set({ submitStartTime }),
    submitEndTimeSetter: (submitEndTime: string) => set({ submitEndTime }),
}));

export default useFormStore;