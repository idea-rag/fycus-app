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
    }
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
    }
    ,
    setFindDogScore : (score : number) => set((state) => ({
        FindDog : {
            ...state.FindDog,
            score : score
        }
    })),
    setSelectSquareScore : (score : number) => set((state) => ({
        SelectSquare : {
            ...state.SelectSquare,
            score : score
        }
    })),
    setFindDogTotal : (total : number) => set((state) => ({
        FindDog : {
            ...state.FindDog,
            total : total
        }
    })),
    setSelectSquareTotal : (total : number) => set((state) => ({
        SelectSquare : {
            ...state.SelectSquare,
            total : total
        }
    })),
    setFindDogTimeSpent : (timeSpent : number) => set((state) => ({
        FindDog : {
            ...state.FindDog,
            timeSpent : timeSpent
        }
    })),
    setSelectSquareTimeSpent : (timeSpent : number) => set((state) => ({
        SelectSquare : {
            ...state.SelectSquare,
            timeSpent : timeSpent
        }
    })),
}));
