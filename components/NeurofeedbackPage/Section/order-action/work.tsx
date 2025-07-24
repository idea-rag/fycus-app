import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import orderActionData from '@/data/order-action.json';
import { useNeurofeedbackStore } from '@/store/useNeurofeedback';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

interface ImageOption {
    image_url: string;
    is_correct: boolean;
}

interface Task {
    id: number;
    instruction_type: string;
    instruction_text: string;
    images: ImageOption[];
}

interface OrderActionWorkProps {
    onComplete?: (score: number, total: number, timeSpent: number) => void;
}

export default function OrderActionWork({ onComplete }: OrderActionWorkProps) {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [startTime, setCurrentTime] = useState<number>(Date.now());
    
    const tasks: Task[] = orderActionData.image_selection_tasks;
    const currentTask = tasks[currentTaskIndex];
    //@ts-ignore
    const { setOrderActionScore, setOrderActionTotal, setOrderActionTimeSpent } = useNeurofeedbackStore();

    useEffect(() => {
        if (currentTask) {
            setCurrentTime(Date.now());
        }
    }, [currentTaskIndex]);

    const handleImageSelect = (index: number) => {
        if (selectedImage !== null) return;
        
        setSelectedImage(index);
        const isCorrect = currentTask.images[index].is_correct;
        
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        
        // Calculate time spent on this task
        const timeSpent = startTime ? (Date.now() - startTime) / 1000 : 0;
        
        // Update store with current progress
        setOrderActionScore(isCorrect ? 1 : 0);
        setOrderActionTotal(1);
        setOrderActionTimeSpent(timeSpent);
        
        // Move to next task after a delay
        setTimeout(() => {
            if (currentTaskIndex < tasks.length - 1) {
                setCurrentTaskIndex(prev => prev + 1);
                setSelectedImage(null);
            } else {
                // All tasks completed
                const finalScore = score + (isCorrect ? 1 : 0);
                setOrderActionScore(finalScore);
                setOrderActionTotal(tasks.length);
                
                // Calculate total time spent
                const totalTimeSpent = tasks.reduce((acc, _, idx) => {
                    return acc + (idx < tasks.length - 1 ? 0 : timeSpent);
                }, 0);
                
                if (onComplete) {
                    onComplete(finalScore, tasks.length, totalTimeSpent);
                }
            }
        }, 1500);
    };

    if (!currentTask) {
        return (
            <CustomView style={styles.container}>
                <CustomText style={styles.completionText}>모든 과제를 완료했습니다!</CustomText>
                <CustomText style={styles.scoreText}>점수: {score} / {tasks.length}</CustomText>
            </CustomView>
        );
    }

    return (
        <CustomView style={styles.container}>
            <View style={styles.instructionContainer}>
                <View style={styles.instructionBox}>
                    <CustomText style={styles.instructionText}>
                        {currentTask.instruction_text}
                    </CustomText>
                </View>
            </View>
            
            <View style={styles.imagesContainer}>
                {currentTask.images.map((image, index) => (
                    <Pressable
                        key={index}
                        onPress={() => handleImageSelect(index)}
                        disabled={selectedImage !== null}
                        style={[
                            styles.imageContainer,
                            selectedImage === index && styles.selectedImage,
                            selectedImage !== null && 
                                currentTask.images[index].is_correct && 
                                styles.correctImage
                        ]}
                    >
                        <Image 
                            source={{ uri: image.image_url }} 
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </Pressable>
                ))}
            </View>
            
            <View style={styles.progressContainer}>
                <CustomText style={styles.progressText}>
                    {currentTaskIndex + 1} / {tasks.length}
                </CustomText>
            </View>
        </CustomView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    instructionContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    instructionType: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    instructionText: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 15,
    },
    instructionBox: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        marginTop: 10,
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    imageContainer: {
        width: '48%',
        aspectRatio: 1,
        marginBottom: 15,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#e0e0e0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    selectedImage: {
        opacity: 0.5,
    },
    correctImage: {
        borderColor: '#34C759',
        borderWidth: 3,
    },
    progressContainer: {
        alignItems: 'center',
        marginTop: 'auto',
    },
    progressText: {
        fontSize: 16,
        color: '#666',
    },
    completionText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#007AFF',
    },
});