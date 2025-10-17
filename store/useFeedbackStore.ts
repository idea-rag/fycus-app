import { create } from "zustand";

interface FeedbackStore {
    feedback: string;
    setFeedback: (feedback: string) => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
    feedback: '',
    setFeedback: (feedback: string) => set({ feedback }),
}));