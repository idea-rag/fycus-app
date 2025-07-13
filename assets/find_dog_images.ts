// 강아지 이미지들
const dogImages = {
    dog1: require('@/assets/images/find_dog_images/dog1.jpg'),
    dog2: require('@/assets/images/find_dog_images/dog2.jpg'),
    dog3: require('@/assets/images/find_dog_images/dog3.jpg'),
    dog4: require('@/assets/images/find_dog_images/dog4.jpg'),
    dog5: require('@/assets/images/find_dog_images/dog5.jpg'),
    dog6: require('@/assets/images/find_dog_images/dog6.jpg'),
    dog7: require('@/assets/images/find_dog_images/dog7.jpg'),
    dog8: require('@/assets/images/find_dog_images/dog8.jpg'),
    dog9: require('@/assets/images/find_dog_images/dog9.jpg'),
    dog10: require('@/assets/images/find_dog_images/dog10.jpg'),
} as const;

export type DogImageKey = keyof typeof dogImages;

export const getDogImage = (key: DogImageKey) => dogImages[key];