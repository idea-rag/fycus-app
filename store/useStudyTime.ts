import { create } from "zustand/react";

interface StudyTimeState {
    studyTime: number;
    focusTime: number;
    focusTimeSetter: (update: number | ((prev: number) => number)) => void;
    studyTimeSetter: (update: number | ((prev: number) => number)) => void;
}

const useStudyTimeStore = create<StudyTimeState>((set) => ({
    studyTime: 0,
    focusTime: 0,
    focusTimeSetter: (update) => set((state) => ({
        focusTime: typeof update === 'function' ? update(state.focusTime) : update
    })),
    studyTimeSetter: (update) => set((state) => ({
        studyTime: typeof update === 'function' ? update(state.studyTime) : update
    }))
}));

export default useStudyTimeStore;