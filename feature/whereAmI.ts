import { usePathname } from 'expo-router';

export function whereAmI(toGo: string): boolean {
    const currentPath = usePathname(); 
    return currentPath === toGo; 
}