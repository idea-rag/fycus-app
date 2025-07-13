// 강아지 이미지들
// 이미지 임포트
const dog1 = require('./images/find_dog_images/circle_circle_circle_big.svg');
const dog2 = require('./images/find_dog_images/circle_circle_circle_small.svg');
const dog3 = require('./images/find_dog_images/circle_circle_triangle.svg');
const dog4 = require('./images/find_dog_images/circle_triangle_circle_big.svg');
const dog5 = require('./images/find_dog_images/circle_triangle_circle_small.svg');
const dog6 = require('./images/find_dog_images/circle_triangle_triangle.svg');
const dog7 = require('./images/find_dog_images/square_circle_circle_big.svg');
const dog8 = require('./images/find_dog_images/square_circle_circle_small.svg');
const dog9 = require('./images/find_dog_images/square_circle_triangle.svg');
const dog10 = require('./images/find_dog_images/square_triangle_circle_big.svg');
const dog11 = require('./images/find_dog_images/square_triangle_circle_small.svg');
const dog12 = require('./images/find_dog_images/square_triangle_triangle.svg');
const dog13 = require('./images/find_dog_images/triangle_circle_circle_big.svg');
const dog14 = require('./images/find_dog_images/triangle_circle_circle_small.svg');
const dog15 = require('./images/find_dog_images/triangle_circle_triangle.svg');
const dog16 = require('./images/find_dog_images/triangle_triangle_circle_big.svg');
const dog17 = require('./images/find_dog_images/triangle_triangle_circle_small.svg');
const dog18 = require('./images/find_dog_images/triangle_triangle_triangle.svg');

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

