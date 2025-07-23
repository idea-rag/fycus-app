import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import CustomButton from "../general/CustomButton";
import TaskComponent from "../general/TaskComponent";
    
interface TaskType {
    name: string;
    importance: number;
    isChecked: boolean;
}

interface IProps {
    tasks : Record<number, TaskType>
}

export default function TaskList(props : IProps) {
    const {tasks} = props
    const router = useRouter();    
    return (
            <ScrollView
                style={[styles.container]}
                contentContainerStyle={{
                    width: '100%',
                    minHeight : 150,
                    paddingHorizontal: SPACING.tiny,
                    paddingVertical: SPACING.tiny,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: SPACING.tiny,
                    borderRadius: SPACING.tiny
                }}>
                {Object.entries(tasks).map(([key, task]) => (
                    <TaskComponent
                        key={key}
                        name={task.name}
                        importance={task.importance}
                        isChecked={task.isChecked}
                    />
                ))}
                <CustomButton
                    text="오늘의 집중훈련 하러가기"
                    width={'100%'}
                    backgroundColor={COLORS.brand.primary}
                    textColor={COLORS.bng.primary}
                    textWeight={'700'}
                    fontSize={FONTS.size.small}
                    height={30}
                    onPress={() => {router.push('/NeurofeedbackPage')}}
                />
            </ScrollView>
        );
    }
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            borderRadius: SPACING.tiny,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
        }
    })
    