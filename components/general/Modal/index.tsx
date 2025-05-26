import React from "react";
import CustomView from "@/components/general/CustomView";
import CustomButton from "@/components/general/CustomButton";
import {SPACING} from "@/styles/spacing";
import {COLORS} from "@/styles/colors";

// Props 정의
type ModalContainerProps = {
    isVisible: boolean; // 모달 표시 여부
    onClose: () => void; // 모달 닫기 동작
    children : any;
};

export default function ModalContainer({ isVisible, onClose, children }: ModalContainerProps) {
    if (!isVisible) return null;

    return (
        <CustomView
            style={{
                flex: 1,
                position: "absolute",
                backgroundColor: "rgba(0,0,0,0.3)",
            }}
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={SPACING.tiny}
        >
            <CustomButton
                text={"X"}
                onPress={onClose}
                width={280}
                justifyText={'flex-end'}
                textColor={COLORS.bng.primary}
            />
            <CustomView
                width={300}
                height={300}
                style={{backgroundColor : 'white'}}
                borderRadius={SPACING.tiny}
            >
                {children}
            </CustomView>
        </CustomView>
    );
}