
interface TaskType {
    name: string;
    importance: number;
    isChecked: boolean;
    whatDay: string;
}

export function sortTasksByImportance(
    tasks: Record<number, TaskType>
): [string, TaskType][] {
    return Object.entries(tasks).sort(([, a], [, b]) => b.importance - a.importance);
}
