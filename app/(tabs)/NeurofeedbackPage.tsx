import PageDefault from "@/components/general/PageDefault";
import FindDog from "@/components/NeurofeedbackPage/Section/find-dog";
import Start from "@/components/NeurofeedbackPage/Section/start";
import findDogListSetup from "@/feature/findDogListSetup";
import { useEffect, useState } from "react";

export default function NeurofeedbackPage() {   
    const [thisPage, setThisPage] = useState<'start' | 'find-dog' >('start');


    useEffect(() => {
        const dogSets = findDogListSetup();
        console.log(dogSets);
        
        const timer = setTimeout(() => {
            setThisPage('find-dog');
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);
    
    const handleComplete = (score: number, total: number) => {
        console.log(`퀴즈 완료! 최종 점수: ${score}/${total}`);
        // 여기에서 결과 페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
        // 예: setThisPage('result');
    };

    return (
        <PageDefault title={'뉴로피드백'} isScrollView={false}>
            {thisPage === 'start' && <Start />}
            {thisPage === 'find-dog' && (
                <FindDog 
                    dogImageSets={findDogListSetup()} 
                    onComplete={handleComplete} 
                />
            )}
        </PageDefault>
    );
}