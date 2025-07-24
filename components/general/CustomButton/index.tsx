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
    style?: any;
    justifyText?: any;
    disabled?: boolean;
    loading?: boolean;
};

export default function CustomButton({
    width, 
    height,
    backgroundColor,
    borderColor,
    hasBorder = false, 
    text = "", 
    textColor = "#111", 
    fontSize = 16, 
    onPress = () => {}, 
    style, 
    textWeight, 
    justifyText,
    disabled = false,
    loading = false
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

    const handlePress = () => {
        if (!disabled && !loading) {
            onPress();
        }
    };

    return (
        <TouchableOpacity 
            onPress={handlePress} 
            activeOpacity={0.8} 
            style={[
                styles.buttonContainer, 
                buttonStyle, 
                { width, height, opacity: disabled || loading ? 0.7 : 1 },
                style
            ]}
            disabled={disabled || loading}
        >
            <Text style={{ color: textColor, fontSize, fontWeight: textWeight }}>
                {loading ? '로딩 중...' : text}
            </Text>
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