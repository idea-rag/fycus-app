export interface ParseData {
    Att: number;
    Med: number;
    Var: number;
    rawHex?: string; // 디버깅을 위한 원본 값
}

export const parseRawData = (rawData: string) => {
    const parse = rawData.split('-').map((item: string) => parseInt(item));
    const Att = parse[0];
    const Med = parse[1];
    const Var = parse[2];
    
    return {
        Att,
        Med,
        Var,
        rawHex: rawData
    };
};
