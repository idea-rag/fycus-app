import { DogImage, getRandomDogImages } from "@/assets/find_dog_images";

export interface DogImageSet {
    images: DogImage[];
    answer: number;
}

export default function findDogListSetup(): DogImageSet[] {
    const dogImageSets: DogImageSet[] = [];
    
    for (let i = 0; i < 10; i++) {
        const randomDogImages = getRandomDogImages();
        const answerIndex = Math.floor(Math.random() * 4);
        
        dogImageSets.push({
            images: randomDogImages,
            answer: answerIndex
        });
    }
    
    return dogImageSets;
}