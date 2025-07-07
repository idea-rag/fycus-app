import { SPACING } from "@/styles/spacing";
import { ScrollView, StyleSheet } from "react-native";
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
    
    return (
            <ScrollView
                style={[styles.container, { maxHeight: 150 }]}
                contentContainerStyle={{
                    width: '100%',
                    maxHeight : 150,
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
            </ScrollView>
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
    