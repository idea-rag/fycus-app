export function batteryStep(battery: number): number {
    if (battery >= 1 && battery <= 25) {
        return 1;
    } else if (battery > 25 && battery <= 50) {
        return 2;
    } else if (battery > 50 && battery <= 75) {
        return 3;
    } else if (battery > 75 && battery <= 100) {
        return 4;
    } else {
        throw new Error('Battery level must be between 1 and 100');
    }
}