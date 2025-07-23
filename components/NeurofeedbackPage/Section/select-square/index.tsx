import { useNeurofeedbackStore } from "@/store/useNeurofeedback";
import { useState } from "react";
import SelectSquareIntroduce from "./introduce";
import SelectSquareWork from "./work";

interface SelectSquareProps {
    selectSquareList: number[];
    onComplete?: (score: number, total: number, timeSpent: number, errors: number) => void;
}

export default function SelectSquare({ selectSquareList, onComplete }: SelectSquareProps) {
    const [squarePage, setSquarePage] = useState<'select-square-introduce' | 'select-square-work'>('select-square-introduce');  
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    //@ts-ignore
    const {setSelectSquareScore, setSelectSquareTotal, setSelectSquareTimeSpent} = useNeurofeedbackStore();

    const [startTime, setStartTime] = useState<number | null>(null);

    const handleStart = () => {
        console.log('퀴즈를 시작합니다.');
        setCurrentQuestion(0); 
        setScore(0);
        setStartTime(Date.now());
        setSquarePage('select-square-work');
    }

    return (
        <>
            {squarePage === 'select-square-introduce' && <SelectSquareIntroduce onStart={handleStart} />}
            {squarePage === 'select-square-work' && selectSquareList.length > 0 && (
                <SelectSquareWork 
                    selectSquareList={selectSquareList} 
                    onComplete={(score, total, errors) => {
                        const endTime = Date.now();
                        const timeSpent = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
                        onComplete?.(score, total, timeSpent, errors);
                        setSelectSquareScore(score);
                        setSelectSquareTotal(total);
                        setSelectSquareTimeSpent(timeSpent);
                    }} 
                />
            )}
        </>
    )
}