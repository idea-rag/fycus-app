import CustomButton from "@/components/general/CustomButton";
import CustomInput from "@/components/general/CustomInput";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

interface IProps {
    subject: string;
    onDelete: (subject: string) => void; // 삭제 핸들러
    onEdit: (oldSubject: string, newSubject: string) => void; // 수정 핸들러
    onModalOpen: () => void;
    publisher: string;
}

export default function SubjectNPublishBox(props: IProps) {
    const { subject, onDelete, onEdit, onModalOpen , publisher} = props;
    const [isEditing, setIsEditing] = useState(false); // 수정 상태를 관리
    const [editedSubject, setEditedSubject] = useState(subject); // 수정 중인 과목 이름


    const handleEditToggle = () => {
        if (isEditing) {
            // 수정 완료 시 새 이름 반영
            onEdit(subject, editedSubject);
        }
        setIsEditing(!isEditing); // 수정 상태 토글
    };

    return (
        <CustomView
            alignItems={"flex-start"}
            justifyContent={"center"}
            gap={SPACING.superTiny}
            width={"100%"}
            flexDirection={"column"}
        >
            <CustomView
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                flexDirection={"row"}
                gap={SPACING.superTiny}
                paddingHorizontal={SPACING.superTiny}
            >
                <CustomView
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    {isEditing ? (
                        <CustomInput
                            onValueChange={setEditedSubject} // 입력값 업데이트
                            width={"100%"}
                            height={30}
                            placeholder={'subject..'}
                        />
                    ) : (
                        <CustomText fontSize={FONTS.size.small}>{subject}</CustomText>
                    )}
                </CustomView>
                <CustomView flexDirection={"row"} gap={SPACING.superTiny} alignItems={"center"}>
                    <MaterialIcons
                        name={isEditing ? "check" : "edit"} // 수정 중이면 "check", 아니면 "edit"
                        size={12}
                        color={isEditing ? COLORS.state.correct : "black"} // 체크 표시 색상
                        onPress={handleEditToggle} // 수정 상태 토글
                    />
                    {!isEditing && (
                        <MaterialIcons
                            name="delete"
                            size={12}
                            color={COLORS.state.uncorrect} // 삭제 아이콘 색상
                            onPress={() => onDelete(subject)} // 삭제 핸들러 호출
                        />
                    )}
                </CustomView>
            </CustomView>
            <CustomButton text={publisher ? publisher : "출판사를 선택해주세요..."} width={"100%"} height={40} onPress={onModalOpen}/>
        </CustomView>
    );
}