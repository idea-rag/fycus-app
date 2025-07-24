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
    onDelete: (subject: string) => void; 
    onEdit: (oldSubject: string, newSubject: string) => void; 
    onModalOpen: () => void;
    publisher: string;
}

export default function SubjectNPublishBox(props: IProps) {
    const { subject, onDelete, onEdit, onModalOpen , publisher} = props;
    const [isEditing, setIsEditing] = useState(false); 
    const [editedSubject, setEditedSubject] = useState(subject); 


    const handleEditToggle = () => {
        if (isEditing) {
            
            onEdit(subject, editedSubject);
        }
        setIsEditing(!isEditing); 
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
                            onValueChange={setEditedSubject} 
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
                        name={isEditing ? "check" : "edit"} 
                        size={24}
                        color={isEditing ? COLORS.state.correct : "black"} 
                        onPress={handleEditToggle} 
                    />
                    {!isEditing && (
                        <MaterialIcons
                            name="delete"
                            size={24}
                            color={COLORS.state.uncorrect} 
                            onPress={() => onDelete(subject)} 
                        />
                    )}
                </CustomView>
            </CustomView>
            <CustomButton text={publisher ? publisher : "출판사를 선택해주세요..."} width={"100%"} height={40} onPress={onModalOpen}/>
        </CustomView>
    );
}