import { View, Text } from "react-native";
import { sortTasksByImportance } from "@/feature/sortTaskByImportance";
import {StyleSheet} from "react-native";
import TaskComponent from "@/components/TaskComponent";
import Button from "@/components/Button";
import {SPACING} from "@/styles/spacing";
import {FONTS} from "@/styles/fonts";
import {COLORS} from "@/styles/colors";

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

    return (
        <View style={styles.container}>
            {sortedTaskList.map(([key, task]) => (
                <TaskComponent
                    key={key}
                    name={task.name}
                    importance={task.importance}
                    isChecked={task.isChecked}
                />
            ))}
            <View style={styles.remainContainer}>
                <Text style={styles.remainText}>외 {remainingTasks}건...</Text>
                <Button text={'-> 보러가기'} backgroundColor={'rgba(255,255,255,0)'} fontSize={FONTS.size.small} textColor={COLORS.brand.high}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: SPACING.tiny,
        display: "flex",
        justifyContent:"flex-start",
        alignItems: "flex-start",
        gap: SPACING.tiny,
        borderRadius: SPACING.tiny,
        shadowColor: "rgba(0,0,0,0.05)",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
    remainContainer:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'flex-start',
        gap:SPACING.tiny
    },
    remainText:{
        color: '#8F8F8F',
    }
})
