import { getDogImage } from "@/assets/find_dog_images";
import PageDefault from "@/components/general/PageDefault";
import FindDogIntroduce from "@/components/NeurofeedbackPage/Section/find-dog/introduce";
import Start from "@/components/NeurofeedbackPage/Section/start";
import { useEffect, useState } from "react";

export default function NeurofeedbackPage() {   

    const [thisPage, setThisPage] = useState<'start' | 'find-dog-introduce' | 'find-dog-work'>('start');
    const [findDogImageNumberList, setFindDogImageNumberList] = useState<number[]>([]);
    const [findDogImageList, setFindDogImageList] = useState<any[]>([]);

    const handleStart = () => {
        console.log('시작하기 버튼이 클릭되었습니다.');
        setThisPage('find-dog-work');
    };

    // 1부터 10까지의 숫자 중 4개를 랜덤하게 선택하는 함수
    const selectRandomNumbers = (): number[] => {
        const numbers: number[] = [];
        while (numbers.length < 4) {
            const randomNum = Math.floor(Math.random() * 10) + 1;
            if (!numbers.includes(randomNum)) {
                numbers.push(randomNum);
            }
        }
        return numbers;
    };

    useEffect(() => {
        console.log('thisPage', thisPage);
        
        const timer = setTimeout(() => {
            setThisPage('find-dog-introduce');
        }, 1000);

        const selectedNumbers = selectRandomNumbers();
        setFindDogImageNumberList(selectedNumbers);
        console.log('선택된 숫자:', selectedNumbers);

        const selectedImages = selectedNumbers.map((number) => {
            const dogKey = `dog${number}` as const;
            // @ts-ignore
            setFindDogImageList(getDogImage(dogKey));
        });
        console.log('선택된 이미지:', selectedImages);
        
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <PageDefault title={'뉴로피드백'} isScrollView={false}>
           {thisPage === 'start' && <Start />}
           {thisPage === 'find-dog-introduce' && <FindDogIntroduce onStart={handleStart} />}
           {thisPage === 'find-dog-work' && {}}
        </PageDefault>
    );
}