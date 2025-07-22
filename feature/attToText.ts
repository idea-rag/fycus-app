export const attToText = (att: number) => {
    if (att >= 0 && att <= 2) {
        return '저집중';
    } else if (att > 2 && att <= 5) {
        return '중간';
    } else if (att > 5 && att <= 7) {
        return '집중';
    } else if (att > 7 && att <= 10) {
        return '매우 집중';
    } else {
        return '그외';
    }
}
