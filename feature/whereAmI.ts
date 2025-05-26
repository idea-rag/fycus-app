import { usePathname } from 'expo-router';

export function whereAmI(toGo: string): boolean {
    const currentPath = usePathname(); // 현재 경로를 얻음
    return currentPath === toGo; // 현재 경로와 toGo 비교
}