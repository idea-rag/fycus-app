import { create } from "zustand";

export const useBeforeStore = create((set) => ({
    previousPath: "",
    setPreviousPath: (path: string) => set({ previousPath: path }),
}));
