// 강아지 이미지들
// 이미지 임포트
const dog1 = require('./images/svgtopng/circle_circle_circle_big.png');
const dog2 = require('./images/svgtopng/circle_circle_circle_small.png');
const dog3 = require('./images/svgtopng/circle_circle_triangle.png');
const dog4 = require('./images/svgtopng/circle_triangle_circle_big.png');
const dog5 = require('./images/svgtopng/circle_triangle_circle_small.png');
const dog6 = require('./images/svgtopng/circle_triangle_triangle.png');
const dog7 = require('./images/svgtopng/square_circle_circle_big.png');
const dog8 = require('./images/svgtopng/square_circle_circle_small.png');
const dog9 = require('./images/svgtopng/square_circle_triangle.png');
const dog10 = require('./images/svgtopng/square_triangle_circle_big.png');
const dog11 = require('./images/svgtopng/square_triangle_circle_small.png');
const dog12 = require('./images/svgtopng/square_triangle_triangle.png');
const dog13 = require('./images/svgtopng/triangle_circle_circle_big.png');
const dog14 = require('./images/svgtopng/triangle_circle_circle_small.png');
const dog15 = require('./images/svgtopng/triangle_circle_triangle.png');
const dog16 = require('./images/svgtopng/triangle_triangle_circle_big.png');
const dog17 = require('./images/svgtopng/triangle_triangle_circle_small.png');
const dog18 = require('./images/svgtopng/triangle_triangle_triangle.png');

const dogImages = {
    dog1,
    dog2,
    dog3,
    dog4,
    dog5,
    dog6,
    dog7,
    dog8,
    dog9,
    dog10,
    dog11,
    dog12,
    dog13,
    dog14,
    dog15,
    dog16,
    dog17,
    dog18,
} as const;

export type DogImageKey = keyof typeof dogImages;

export const getDogImage = (key: DogImageKey) => dogImages[key];

export type DogImage = {
    id: DogImageKey;
    source: any;
};

export const getRandomDogImages = (count: number = 4): DogImage[] => {
    const allDogKeys = Object.keys(dogImages) as DogImageKey[];
    
    const shuffled = [...allDogKeys].sort(() => 0.5 - Math.random());
    
    const selectedCount = Math.min(count, allDogKeys.length);
    const selectedKeys = shuffled.slice(0, selectedCount);
    
    return selectedKeys.map(key => ({
        id: key,
        source: dogImages[key]
    }));
};

// Image explanations based on filename pattern: [ear shape]_[eye shape]_[nose shape]_[nose size]
const dog1_explanation = '동그란 귀와 동그란 눈, 동그랗고 큰 코';
const dog2_explanation = '동그란 귀와 동그란 눈, 동그랗고 작은 코';
const dog3_explanation = '동그란 귀와 동그란 눈, 세모난 코';
const dog4_explanation = '동그란 귀와 세모난 눈, 동그랗고 큰 코';
const dog5_explanation = '동그란 귀와 세모난 눈, 동그랗고 작은 코';
const dog6_explanation = '동그란 귀와 세모난 눈, 세모난 코';
const dog7_explanation = '네모난 귀와 동그란 눈, 동그랗고 큰 코';
const dog8_explanation = '네모난 귀와 동그란 눈, 동그랗고 작은 코';
const dog9_explanation = '네모난 귀와 동그란 눈, 세모난 코';
const dog10_explanation = '네모난 귀와 세모난 눈, 동그랗고 큰 코';
const dog11_explanation = '네모난 귀와 세모난 눈, 동그랗고 작은 코';
const dog12_explanation = '네모난 귀와 세모난 눈, 세모난 코';
const dog13_explanation = '세모난 귀와 동그란 눈, 동그랗고 큰 코';
const dog14_explanation = '세모난 귀와 동그란 눈, 동그랗고 작은 코';
const dog15_explanation = '세모난 귀와 동그란 눈, 세모난 코';
const dog16_explanation = '세모난 귀와 세모난 눈, 동그랗고 큰 코';
const dog17_explanation = '세모난 귀와 세모난 눈, 동그랗고 작은 코';
const dog18_explanation = '세모난 귀와 세모난 눈, 세모난 코';

export const dogExplanations = {
    dog1_explanation,
    dog2_explanation,
    dog3_explanation,
    dog4_explanation,
    dog5_explanation,
    dog6_explanation,
    dog7_explanation,
    dog8_explanation,
    dog9_explanation,
    dog10_explanation,
    dog11_explanation,
    dog12_explanation,
    dog13_explanation,
    dog14_explanation,
    dog15_explanation,
    dog16_explanation,
    dog17_explanation,
    dog18_explanation,
};