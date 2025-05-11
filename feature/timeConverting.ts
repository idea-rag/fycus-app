export function timeConverting(minutes: number): string {
    const hours = Math.floor(minutes / 60); // 분을 시간으로 변환
    const remainingMinutes = minutes % 60; // 남은 분 계산

    // 두 자리 문자열 형식 만들기
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}