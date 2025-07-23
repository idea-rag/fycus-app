import { dogExplanations } from "@/assets/find_dog_images";
import { DogImageSet } from "@/feature/findDogListSetup";
import { useNeurofeedbackStore } from "@/store/useNeurofeedback";
import { useState } from "react";
import FindDogIntroduce from "./introduce";
import FindDogWork from "./work";


interface FindDogProps {
    dogImageSets: DogImageSet[];
    onComplete: (score: number, total: number, timeSpent: number) => void;
}

export default function FindDog({ dogImageSets, onComplete }: FindDogProps) {
    const [dogPage, setDogPage] = useState<'find-dog-introduce' | 'find-dog-work'>('find-dog-introduce');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [dogStep, setDogStep] = useState<number>(0);
    const [score, setScore] = useState(0);
    
    //@ts-ignore
    const {setFindDogScore, setFindDogTotal, setFindDogTimeSpent} = useNeurofeedbackStore();
    
    // 퀴즈 시작 핸들러
    const [startTime, setStartTime] = useState<number | null>(null);

    const handleStart = () => {
        console.log('퀴즈를 시작합니다.');
        setCurrentQuestion(0); 
        setScore(0);
        setStartTime(Date.now());
        setDogPage('find-dog-work');
        setDogStep(0);
    };
    
    // 정답 체크 핸들러
    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
    
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < dogImageSets.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                const endTime = Date.now();
                const timeSpent = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
                console.log('퀴즈 종료. 점수:', score, '/', dogImageSets.length, '소요 시간:', timeSpent, '초');
                onComplete?.(score, dogImageSets.length, timeSpent);
                setFindDogScore(score);
                setFindDogTotal(10);
                setFindDogTimeSpent(timeSpent);
            }
        }, 100);
    };
    
    
    return (
        <>
            {dogPage === 'find-dog-introduce' && <FindDogIntroduce onStart={handleStart} />}
                        {dogPage === 'find-dog-work' && dogImageSets.length > 0 && (
                        <FindDogWork 
                            key={currentQuestion}
                            element={dogImageSets[currentQuestion]?.images || []}
                            answer={dogImageSets[currentQuestion]?.answer || 0}
                            onPress={handleAnswer}
                            // @ts-ignore
                            introductionText={
                                dogExplanations[
                                  `${dogImageSets[currentQuestion]?.images[dogImageSets[currentQuestion]?.answer]?.id}_explanation`
                                ]
                              }                        
                />
            )}
        </>
    );
}