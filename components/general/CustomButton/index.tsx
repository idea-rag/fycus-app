import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type ButtonProps = {
    width?: any; 
    height?: number; 
    backgroundColor?: string; 
    borderColor?: string; 
    hasBorder?: boolean; 
    text?: string; 
    textColor?: string; 
    textWeight?: any,
    fontSize?: number; 
    onPress?: () => void; 
    style? : any;
    justifyText?: any;
};

export default function CustomButton({
                                        width, height,
                                         backgroundColor,
                                         borderColor,
                                         hasBorder = false, 
                                         text = "", 
                                         textColor = "#111", 
                                         fontSize = 16, 
                                         onPress = () => {}, 
    style, textWeight, justifyText
                                     }: ButtonProps) {
    
    const buttonStyle: StyleProp<ViewStyle> = {
        backgroundColor,
        borderColor: hasBorder ? borderColor : "transparent",
        borderWidth: hasBorder ? 1 : 0,
        borderRadius: 8, 
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
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
    },
});