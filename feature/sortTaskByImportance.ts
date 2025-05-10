// 중요도 기준 내림차순 정렬 함수
export function sortTasksByImportance(
    tasks: Record<number, { name: string; importance: number; isChecked: boolean }>
) {
    return Object.entries(tasks).sort(([, a], [, b]) => b.importance - a.importance);
}
