import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";

type ButtonProps = {
    width?: any; // 버튼 너비
    height?: number; // 버튼 높이
    backgroundColor?: string; // 배경 색상
    borderColor?: string; // 보더 색상
    hasBorder?: boolean; // 보더 활성화 여부
    text?: string; // 버튼 내부의 텍스트
    textColor?: string; // 텍스트 색상
    textWeight?: any,
    fontSize?: number; // 텍스트 크기
    onPress?: () => void; // 버튼 클릭 이벤트
    style? : any;
    justifyText?: any;
};

export default function CustomButton({
                                        width, height,
                                         backgroundColor,
                                         borderColor,
                                         hasBorder = false, // 기본적으로 보더 비활성화
                                         text = "", // 기본 텍스트 비어 있음
                                         textColor = "#111", // 텍스트 기본 색상
                                         fontSize = 16, // 텍스트 기본 크기
                                         onPress = () => {}, // 기본 클릭 이벤트
    style, textWeight, justifyText
                                     }: ButtonProps) {
    // 버튼 스타일 동적 설정
    const buttonStyle: StyleProp<ViewStyle> = {
        backgroundColor,
        borderColor: hasBorder ? borderColor : "transparent",
        borderWidth: hasBorder ? 1 : 0,
        borderRadius: 8, // 버튼의 모서리를 약간 둥글게
        alignItems: "center" ,
        justifyContent: justifyText ? justifyText : "center",
        flexDirection: "row",
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.buttonContainer, buttonStyle, {width, height},style ]}>
            <Text style={[ { color: textColor, fontSize, fontWeight: textWeight,  }]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row", // 버튼 텍스트를 가로 정렬
        alignItems: "center", // 수직 정렬
        justifyContent: "center", // 가로 정렬
    },
});