import PageDefault from "@/components/general/PageDefault";
import FindDogIntroduce from "@/components/NeurofeedbackPage/Section/find-dog/introduce";
import FindDogWork from "@/components/NeurofeedbackPage/Section/find-dog/work";
import Start from "@/components/NeurofeedbackPage/Section/start";
import { DogImageSet } from "@/feature/findDogListSetup";
import findDogListSetup from "@/feature/findDogListSetup";
import { useEffect, useState } from "react";

export default function NeurofeedbackPage() {   
    const [thisPage, setThisPage] = useState<'start' | 'find-dog-introduce' | 'find-dog-work'>('start');
    const [dogImageSets, setDogImageSets] = useState<DogImageSet[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    // 퀴즈 시작 핸들러
    const handleStart = () => {
        console.log('퀴즈를 시작합니다.');
        setCurrentQuestion(0); // 첫 번째 문제로 초기화
        setScore(0); // 점수 초기화
        setThisPage('find-dog-work');
    };

    // 정답 체크 핸들러
    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prev => prev + 1);
            console.log('정답입니다!');
        } else {
            console.log('틀렸습니다.');
        }

        // 다음 문제로 이동 또는 결과 화면으로
        if (currentQuestion < dogImageSets.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            console.log('모든 문제를 다 풀었습니다! 최종 점수:', score + (isCorrect ? 1 : 0), '/', dogImageSets.length);
            // 여기에 결과 화면으로 이동하는 로직을 추가할 수 있습니다.
        }
    };

    // 컴포넌트 마운트 시 강아지 이미지 세트 초기화
    useEffect(() => {
        const dogSets = findDogListSetup();
        setDogImageSets(dogSets);
        
        const timer = setTimeout(() => {
            setThisPage('find-dog-introduce');
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <PageDefault title={'뉴로피드백'} isScrollView={false}>
            {thisPage === 'start' && <Start />}
            {thisPage === 'find-dog-introduce' && <FindDogIntroduce onStart={handleStart} />}
            {thisPage === 'find-dog-work' && dogImageSets.length > 0 && (
                <FindDogWork 
                    element={dogImageSets[currentQuestion]?.images || []}
                    answer={dogImageSets[currentQuestion]?.answer || 0}
                    onPress={handleAnswer}
                />
            )}
        </PageDefault>
    );
}