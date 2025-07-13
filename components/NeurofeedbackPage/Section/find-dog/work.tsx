import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface IProps {
    element : any[]
    answer : number
    isCorrect : boolean
    onPress : (index : number) => void
}

export default function FindDogWork(props: IProps) {
    const { element, answer, onPress } = props;
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handlePress = (index: number) => {
        if (isAnswered) return; // 이미 답을 선택한 경우 더 이상 선택 불가
        
        setSelectedIndex(index);
        setIsAnswered(true);
        onPress(index);
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