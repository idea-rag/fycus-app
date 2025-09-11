import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import TaskComponent from "@/components/general/TaskComponent";
import { sortTasksByImportance } from "@/feature/sortTaskByImportance";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

interface TaskType {
    name: string;
    importance: number;
    isChecked: boolean;
}

interface IProps {
    tasks: Record<number, TaskType>;
}

export default function TaskFrame({ tasks }: IProps) {
    const sortedTaskList = sortTasksByImportance(tasks).slice(0, 3);
    const remainingTasks = Object.keys(tasks).length - sortedTaskList.length;
    const router = useRouter();

    return (
        <CustomView
            width={'100%'}
            paddingHorizontal={SPACING.tiny}
            paddingVertical={SPACING.tiny}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            gap={SPACING.tiny}
            borderRadius={SPACING.tiny}
            style={styles.container}>
            {sortedTaskList.map(([key, task]) => (
                <TaskComponent
                    key={key}
                    name={task.name}
                    importance={task.importance}
                    isChecked={task.isChecked}
                />
            ))}
            <CustomView
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                gap={SPACING.tiny}>
                <CustomText textColor={'#8f8f8f'} fontSize={FONTS.size.small}>외 {remainingTasks}건...</CustomText>
                {}
                <CustomButton text={'-> 보러가기'} backgroundColor={'rgba(255,255,255,0)'} fontSize={FONTS.size.small} textColor={COLORS.brand.high} onPress={() => {router.navigate('/taskPage')}}></CustomButton>
            </CustomView>
        </CustomView>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "rgba(0,0,0,0.05)",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
    }
})
