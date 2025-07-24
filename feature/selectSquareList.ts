
export function generateRandomNumbers(): number[] {
    
    const numbers = Array.from({ length: 30 }, (_, i) => i + 1);
    
    
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    return numbers; 
}

export const selectSquareList = generateRandomNumbers();
