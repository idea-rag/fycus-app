import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { Modal, StyleSheet, View } from "react-native";
import { COLORS } from "@/styles/colors";

interface IProps {
    visible: boolean;
    onClose: () => void;
    onNavigateToFeedback: () => void;
}

export default function FeedbackSelectModal({ visible, onClose, onNavigateToFeedback }: IProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <CustomText fontSize={16} fontWeight="500" style={{ marginBottom: 20, textAlign: 'center' }}>
                        학습이 완료되었습니다!{'\n'}피드백을 받으시겠습니까?
                    </CustomText>
                    <View style={styles.buttonContainer}>
                    <CustomButton
                            text="네, 받을게요"
                            textColor={COLORS.bng.primary}
                            onPress={onNavigateToFeedback}
                            height={40}
                            width="45%"
                            backgroundColor={COLORS.brand.primary}
                        />
                        <CustomButton
                            text="아니오"
                            onPress={onClose}
                            width="45%"
                            backgroundColor="#F0F0F0"
                            textColor="#333"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});