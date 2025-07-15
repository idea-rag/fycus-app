import PageDefault from "@/components/general/PageDefault";
import FindDog from "@/components/NeurofeedbackPage/Section/find-dog";
import SelectSquare from "@/components/NeurofeedbackPage/Section/select-square";
import Start from "@/components/NeurofeedbackPage/Section/start";
import findDogListSetup from "@/feature/findDogListSetup";
import { generateRandomNumbers } from "@/feature/selectSquareList";
import { useEffect, useState } from "react";

export default function NeurofeedbackPage() {   
    const [thisPage, setThisPage] = useState<'start' | 'find-dog' | 'select-square' >('start');

    useEffect(() => {
        const dogSets = findDogListSetup();
        const squareList = generateRandomNumbers();
        console.log(dogSets);
        console.log(squareList);
        
        const timer = setTimeout(() => {
            setThisPage('find-dog');
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);
    
    const handleFindDogComplete = (score: number, total: number, timeSpent: number) => {
        console.log(`퀴즈 완료! 최종 점수: ${score}/${total}, 소요 시간: ${timeSpent}초`);
        setThisPage('select-square');
    };

    const handleSelectSquareComplete = (score: number, total: number, timeSpent: number, errors: number) => {
        console.log(`퀴즈 완료! 최종 점수: ${score}/${total}, 오류: ${errors}회, 소 요 시간: ${timeSpent}초`);
    };

    return (
        <PageDefault title={'뉴로피드백'} isScrollView={false}>
            {thisPage === 'start' && <Start />}
            {thisPage === 'find-dog' && (
                <FindDog 
                    dogImageSets={findDogListSetup()} 
                    onComplete={handleFindDogComplete} 
                />
            )}
            {thisPage === 'select-square' && (
                <SelectSquare 
                    selectSquareList={generateRandomNumbers()} 
                    onComplete={handleSelectSquareComplete} 
                />
            )}
        </PageDefault>
    );
}