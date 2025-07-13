import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface IProps {
    element: any[]; 
    answer: number; 
    onPress: (isCorrect: boolean) => void; 
}

export default function FindDogWork(props: IProps) {
    const { element, answer, onPress } = props;
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handlePress = (index: number) => {
        if (isAnswered) return; 
        
        const isCorrect = index === answer; 
        setSelectedIndex(index);
        setIsAnswered(true);
        
        onPress(isCorrect);
    };

    return (
        <CustomView
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            paddingHorizontal={SPACING.medium}
            style={{flex : 1}}
        >
            <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={600}>1. find-dog</CustomText>
            <CustomView 
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: SPACING.medium
                }}
            >
                {element.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            onPress={() => handlePress(index)}
                            disabled={isAnswered}
                            activeOpacity={0.7}
                        >
                            <Image 
                                source={item}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                    opacity: isAnswered && index !== selectedIndex && index !== answer ? 0.5 : 1
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ))}
            </CustomView>
        </CustomView>
    )
}