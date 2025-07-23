import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

interface SelectSquareWorkProps {
    selectSquareList: number[];
    onComplete?: (score: number, total: number, errors: number) => void;
}

type NumberState = {
    value: number;
    isClicked: boolean;
    isCorrect: boolean | null;
};

export default function SelectSquareWork({ selectSquareList, onComplete }: SelectSquareWorkProps) {
    const [numbers, setNumbers] = useState<NumberState[]>([]);
    const [currentNumber, setCurrentNumber] = useState(1);
    const [errors, setErrors] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const shuffledNumbers = [...selectSquareList].sort(() => Math.random() - 0.5);
        setNumbers(
            shuffledNumbers.map((num) => ({
                value: num,
                isClicked: false,
                isCorrect: null,
            }))
        );
    }, [selectSquareList]);

    const handleNumberPress = (pressedNumber: NumberState) => {
        if (pressedNumber.isClicked || isCompleted) return;

        const isCorrect = pressedNumber.value === currentNumber;
        const updatedNumbers = numbers.map((num) =>
            num.value === pressedNumber.value
                ? { ...num, isClicked: true, isCorrect }
                : num
        );

        setNumbers(updatedNumbers);

        if (isCorrect) {
            if (currentNumber === selectSquareList.length) {
                setIsCompleted(true);
                onComplete?.(selectSquareList.length, selectSquareList.length, errors);
             
            } else {
                setCurrentNumber((prev) => prev + 1);
            }
        } else {
            const newErrors = errors + 1;
            setErrors(newErrors);
            
            setTimeout(() => {
                const resetNumbers = numbers.map((num) =>
                    num.value === pressedNumber.value
                        ? { ...num, isClicked: false, isCorrect: null }
                        : num
                );
                setNumbers(resetNumbers);
            }, 500);
        }
    };

    const getNumberStyle = (number: NumberState) => {
        if (!number.isClicked) return styles.number;
        return number.isCorrect ? styles.correctNumber : styles.wrongNumber;
    };

    return (
        <CustomView
            width={'100%'}
            height={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            paddingHorizontal={SPACING.medium}
            style={{ flex: 1 }}
        >
            
            <CustomView
                style={styles.grid}
            >
                {numbers.map((number, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.numberContainer,
                            getNumberStyle(number)
                        ]}
                        onPress={() => handleNumberPress(number)}
                        disabled={number.isClicked || isCompleted}
                    >
                        <CustomText 
                            fontSize={FONTS.size.body} 
                            textColor={number.isClicked ? COLORS.bng.primary : COLORS.text.primary} 
                            fontWeight={600}
                        >
                            {number.value}
                        </CustomText>
                    </TouchableOpacity>
                ))}
            </CustomView>
            

        </CustomView>
    )
}

const styles = {
    grid: {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        gap: 10,
        width: '100%',
        maxWidth: 350,
    },
    numberContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.text.primary,
    },
    number: {
        backgroundColor: COLORS.bng.primary,
    },
    correctNumber: {
        backgroundColor: COLORS.state.correct,
        borderColor: COLORS.state.correct,
    },
    wrongNumber: {
        backgroundColor: COLORS.state.uncorrect,
        borderColor: COLORS.state.uncorrect,
    },
};