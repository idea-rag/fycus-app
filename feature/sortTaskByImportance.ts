
export function sortTasksByImportance(
    tasks: Record<number, { name: string; importance: number; isChecked: boolean }>
) {
    return Object.entries(tasks).sort(([, a], [, b]) => b.importance - a.importance);
}
