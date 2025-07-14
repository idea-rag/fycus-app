
export function generateRandomNumbers(): number[] {
    // 1부터 30까지의 숫자 배열 생성
    const numbers = Array.from({ length: 30 }, (_, i) => i + 1);
    
    // Fisher-Yates 셔플 알고리즘을 사용하여 배열 섞기
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    return numbers; // 섞인 1~30의 숫자 배열 반환
}

export const selectSquareList = generateRandomNumbers();
