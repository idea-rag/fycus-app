import { create } from "zustand";

interface NeurofeedbackState {
    FindDog : {
        score : number;
        total : number;
        timeSpent : number;
    },
    SelectSquare : {
        score : number;
        total : number;
        timeSpent : number;
    },
    OrderAction : {
        score : number;
        total : number;
        timeSpent : number;
    },
    setFindDogScore: (score: number) => void;
    setSelectSquareScore: (score: number) => void;
    setFindDogTotal: (total: number) => void;
    setSelectSquareTotal: (total: number) => void;
    setFindDogTimeSpent: (timeSpent: number) => void;
    setSelectSquareTimeSpent: (timeSpent: number) => void;
    setOrderActionScore: (score: number) => void;
    setOrderActionTotal: (total: number) => void;
    setOrderActionTimeSpent: (timeSpent: number) => void;
}

export const useNeurofeedbackStore = create<NeurofeedbackState>((set) => ({
    FindDog : {
        score : 0,
        total : 0,
        timeSpent : 0,
    },
    SelectSquare : {
        score : 0,
        total : 0,
        timeSpent : 0,
    },
    OrderAction : {
        score : 0,
        total : 0,
        timeSpent : 0,
    },
    setFindDogScore: (score: number) => set((state) => ({
        FindDog: {
            ...state.FindDog,
            score: score
        }
    })),
    setSelectSquareScore: (score: number) => set((state) => ({
        SelectSquare: {
            ...state.SelectSquare,
            score: score
        }
    })),
    setFindDogTotal: (total: number) => set((state) => ({
        FindDog: {
            ...state.FindDog,
            total: total
        }
    })),
    setSelectSquareTotal: (total: number) => set((state) => ({
        SelectSquare: {
            ...state.SelectSquare,
            total: total
        }
    })),
    setFindDogTimeSpent: (timeSpent: number) => set((state) => ({
        FindDog: {
            ...state.FindDog,
            timeSpent: timeSpent
        }
    })),
    setSelectSquareTimeSpent: (timeSpent: number) => set((state) => ({
        SelectSquare: {
            ...state.SelectSquare,
            timeSpent: timeSpent
        }
    })),
    setOrderActionScore: (score: number) => set((state) => ({
        OrderAction: {
            ...state.OrderAction,
            score: score
        }
    })),
    setOrderActionTotal: (total: number) => set((state) => ({
        OrderAction: {
            ...state.OrderAction,
            total: total
        }
    })),
    setOrderActionTimeSpent: (timeSpent: number) => set((state) => ({
        OrderAction: {
            ...state.OrderAction,
            timeSpent: timeSpent
        }
    })),
}));
