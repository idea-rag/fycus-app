import { useState, useEffect } from "react";
import OrderActionIntroduce from "./indtroduce";
import OrderActionWork from "./work";

interface OrderActionProps {
    onComplete?: (score: number, total: number, timeSpent: number) => void;
}

export default function OrderAction({ onComplete }: OrderActionProps) {
    const [orderPage, setOrderPage] = useState<'order-action-introduce' | 'order-action-work'>('order-action-introduce');
    
    const handleStart = () => {
        console.log('퀴즈를 시작합니다.');
        setOrderPage('order-action-work');
    };

    const handleOrderActionComplete = (score: number, total: number, timeSpent: number) => {
        console.log(`퀴즈 완료! 최종 점수: ${score}/${total}, 소요 시간: ${timeSpent}초`);
        if (onComplete) {
            onComplete(score, total, timeSpent);
        }
    };

    return (
       <>
       {orderPage === 'order-action-introduce' && <OrderActionIntroduce onStart={handleStart} />}
       {orderPage === 'order-action-work' && <OrderActionWork onComplete={handleOrderActionComplete} />}
       </>
    )
}