import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import PageDefault from "@/components/general/PageDefault";
import FindDog from "@/components/NeurofeedbackPage/Section/find-dog";
import OrderAction from "@/components/NeurofeedbackPage/Section/order-action";
import SelectSquare from "@/components/NeurofeedbackPage/Section/select-square";
import Start from "@/components/NeurofeedbackPage/Section/start";
import findDogListSetup from "@/feature/findDogListSetup";
import { generateRandomNumbers } from "@/feature/selectSquareList";
import { useNeurofeedbackStore } from "@/store/useNeurofeedback";
import { COLORS } from "@/styles/colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    completionContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    completionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    section: {
        marginBottom: 30,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#2c3e50',
        textAlign: 'center',
    },
    subSection: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    subSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#34495e',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 40,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: 5,
    },
    statTotal: {
        fontSize: 16,
        color: '#666',
    },
    statLabel: {
        fontSize: 14,
        color: COLORS.text.third,
    },
    statLabelSmall: {
        fontSize: 14,
        marginLeft: 2,
    },
    percent: {
        fontSize: 16,
    },
   
});

export default function NeurofeedbackPage() {
    const [thisPage, setThisPage] = useState<'start' | 'find-dog' | 'select-square' | 'order-action' | 'completion'>('start');
    const {
        setFindDogScore, setFindDogTotal, setFindDogTimeSpent,
        setSelectSquareScore, setSelectSquareTotal, setSelectSquareTimeSpent,
        setOrderActionScore, setOrderActionTotal, setOrderActionTimeSpent
    } = useNeurofeedbackStore();
    const [quizResults, setQuizResults] = useState<{
        findDog: {
            score: number;
            total: number;
            timeSpent: number;
        };
        selectSquare: {
            score: number;
            total: number;
            timeSpent: number;
            errors: number;
        };
        orderAction: {
            score: number;
            total: number;
            timeSpent: number;
        };
    } | null>(null);

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
    
    const [sectionResults, setSectionResults] = useState({
        findDog: { score: 0, total: 0, timeSpent: 0 },
        selectSquare: { score: 0, total: 0, timeSpent: 0, errors: 0 },
        orderAction: { score: 0, total: 0, timeSpent: 0 }
    });

    const handleFindDogComplete = (score: number, total: number, timeSpent: number) => {
        console.log(`퀴즈 완료! 최종 점수: ${score}/${total}, 소요 시간: ${timeSpent}초`);
        setSectionResults(prev => ({
            ...prev,
            findDog: { score, total, timeSpent }
        }));
        setThisPage('select-square');
    };

    const handleSelectSquareComplete = (score: number, total: number, timeSpent: number, errors: number) => {
        console.log(`퀴즈 완료! 최종 점수: ${score}/${total}, 오류: ${errors}회, 소요 시간: ${timeSpent}초`);
        setSectionResults(prev => ({
            ...prev,
            selectSquare: { score, total, timeSpent, errors }
        }));
        setThisPage('order-action');
    };

    const handleOrderActionComplete = (score: number, total: number, timeSpent: number) => {
        console.log(`퀴즈 완료! 최종 점수: ${score}/${total}, 소요 시간: ${timeSpent}초`);
        
        // Update section results
        const updatedResults = {
            ...sectionResults,
            orderAction: { score, total, timeSpent }
        };
        
        // Update neurofeedback store with final results
        setFindDogScore(updatedResults.findDog.score);
        setFindDogTotal(updatedResults.findDog.total);
        setFindDogTimeSpent(updatedResults.findDog.timeSpent);
        
        setSelectSquareScore(updatedResults.selectSquare.score);
        setSelectSquareTotal(updatedResults.selectSquare.total);
        setSelectSquareTimeSpent(updatedResults.selectSquare.timeSpent);
        
        setOrderActionScore(updatedResults.orderAction.score);
        setOrderActionTotal(updatedResults.orderAction.total);
        setOrderActionTimeSpent(updatedResults.orderAction.timeSpent);
        
        setSectionResults(updatedResults);
        setThisPage('completion');
    };

    const handleGoToMain = () => {
        // Save final results to store before navigating away
        const store = useNeurofeedbackStore.getState();
        console.log('Final neurofeedback results saved to store:', {
            findDog: {
                score: store.FindDog.score,
                total: store.FindDog.total,
                timeSpent: store.FindDog.timeSpent
            },
            selectSquare: {
                score: store.SelectSquare.score,
                total: store.SelectSquare.total,
                timeSpent: store.SelectSquare.timeSpent
            },
            orderAction: {
                score: store.OrderAction.score,
                total: store.OrderAction.total,
                timeSpent: store.OrderAction.timeSpent
            }
        });
        
        router.replace('/(tabs)');
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
            {thisPage === 'order-action' && (
                <OrderAction
                    onComplete={handleOrderActionComplete}
                />
            )}
            {thisPage === 'completion' && (
                <ScrollView style={styles.completionContainer}>
                    <CustomText style={styles.completionTitle}>뉴로피드백 결과</CustomText>
                    <View style={styles.section}>
                        <CustomText style={styles.sectionTitle}>종합 결과</CustomText>
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <CustomText style={styles.statValue}>
                                    {sectionResults.findDog.score + sectionResults.selectSquare.score + sectionResults.orderAction.score}
                                    <Text style={styles.statTotal}>/
                                        {sectionResults.findDog.total + sectionResults.selectSquare.total + sectionResults.orderAction.total}
                                    </Text>
                                </CustomText>
                                <CustomText style={styles.statLabel}>총 정답 수</CustomText>
                            </View>
                            <View style={styles.statItem}>
                                <CustomText style={styles.statValue}>
                                    {Math.round(((sectionResults.findDog.score + sectionResults.selectSquare.score + sectionResults.orderAction.score) / 
                                        (sectionResults.findDog.total + sectionResults.selectSquare.total + sectionResults.orderAction.total)) * 100)}
                                    <Text style={styles.percent}>%</Text>
                                </CustomText>
                                <CustomText style={styles.statLabel}>총 정답률</CustomText>
                            </View>
                            <View style={styles.statItem}>
                                <CustomText style={styles.statValue}>
                                    {Math.round(sectionResults.findDog.timeSpent + sectionResults.selectSquare.timeSpent + sectionResults.orderAction.timeSpent)}
                                    <Text style={styles.statLabelSmall}>초</Text>
                                </CustomText>
                                <CustomText style={styles.statLabel}>총 소요 시간</CustomText>
                            </View>
                        </View>
                    </View>

                    {/* Individual Section Results */}
                    <View style={styles.section}>
                        <CustomText style={styles.sectionTitle}>뉴로피드백 결과</CustomText>
                        
                        {/* Find Dog Section */}
                        <View style={styles.subSection}>
                            <CustomText style={styles.subSectionTitle}>1. find dog</CustomText>
                            <View style={styles.statsContainer}>
                                <View style={styles.statItem}>
                                    <CustomText style={styles.statValue}>
                                        {sectionResults.findDog.score}<Text style={styles.statTotal}>/{sectionResults.findDog.total}</Text>
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>정답 수</CustomText>
                                </View>
                                <View style={styles.statItem}>
                                    <CustomText style={styles.statValue}>
                                        {Math.round((sectionResults.findDog.score / sectionResults.findDog.total) * 100)}%
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>정답률</CustomText>
                                </View>
                                <View style={styles.statItem}>
                                    <CustomText style={styles.statValue}>
                                        {Math.round(sectionResults.findDog.timeSpent)}<Text style={styles.statLabelSmall}>초</Text>
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>소요 시간</CustomText>
                                </View>
                            </View>
                        </View>

                        {/* Select Square Section */}
                        <View style={styles.subSection}>
                            <CustomText style={styles.subSectionTitle}>2. select square</CustomText>
                            <View style={styles.statsContainer}>
                                <View style={styles.statItem}>
                                    <CustomText style={styles.statValue}>
                                        {sectionResults.selectSquare.score}<Text style={styles.statTotal}>/{sectionResults.selectSquare.total}</Text>
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>정답 수</CustomText>
                                </View>
                                <View style={styles.statItem}>
                                    <CustomText style={styles.statValue}>
                                        {Math.round((sectionResults.selectSquare.score / sectionResults.selectSquare.total) * 100)}%
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>정답률</CustomText>
                                </View>
                                <View style={styles.statItem}>
                                    <CustomText style={styles.statValue}>
                                        {Math.round(sectionResults.selectSquare.timeSpent)}<Text style={styles.statLabelSmall}>초</Text>
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>소요 시간</CustomText>
                                </View>
                                <View style={[styles.statItem, { flex: 1.5 }]}>
                                    <CustomText style={styles.statValue}>
                                        {sectionResults.selectSquare.errors}
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>오답 횟수</CustomText>
                                </View>
                            </View>
                        </View>

                        {/* Order Action Section */}
                        <View style={styles.subSection}>
                            <CustomText style={styles.subSectionTitle}>3. order action</CustomText>
                            <View style={styles.statsContainer}>
                                <View style={styles.statItem}>
                                    <CustomText style={styles.statValue}>
                                        {sectionResults.orderAction.score}<Text style={styles.statTotal}>/{sectionResults.orderAction.total}</Text>
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>정답 수</CustomText>
                                </View>
                                <View style={styles.statItem}>
                                    <CustomText style={styles.statValue}>
                                        {Math.round((sectionResults.orderAction.score / sectionResults.orderAction.total) * 100)}%
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>정답률</CustomText>
                                </View>
                                <View style={styles.statItem}>
                                    <CustomText style={styles.statValue}>
                                        {Math.round(sectionResults.orderAction.timeSpent)}<Text style={styles.statLabelSmall}>초</Text>
                                    </CustomText>
                                    <CustomText style={styles.statLabel}>소요 시간</CustomText>
                                </View>
                            </View>
                        </View>
                    </View>
                    <CustomButton 
                        text="메인으로 가기"
                        width={"100%"}
                        height={50}
                        backgroundColor={COLORS.brand.primary}
                        textColor={COLORS.bng.primary}
                        onPress={handleGoToMain}
                    />
                    <CustomView
                        height={50}
                    />
                </ScrollView>
            )}
        </PageDefault>
    );
}