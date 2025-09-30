import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput } from 'react-native';
import { COLORS } from '@/styles/colors';
import { FONTS } from '@/styles/fonts';
import { SPACING } from '@/styles/spacing';
import CustomButton from '../general/CustomButton';
import useFormStore from '@/store/useForm';
import CustomText from '../general/CustomText';
import Work from '../ProfilePage/Work';
import Subject from '../ProfilePage/Subject';
import CustomView from '../general/CustomView';

type SubjectModule = {
  subject: string;
  color: string;
  scope?: string;
}[];

type EditProfileModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function EditProfileModal({
  visible,
  onClose,
}: EditProfileModalProps) {
  const [currentStep, setCurrentStep] = useState<'subject' | 'work' | 'done'>('subject');
  //@ts-ignore
  const { submitSubjectModule, submitWork, submitWorkSetter } = useFormStore();

  const handleWorkNext = () => {
    setCurrentStep('done');
  };

  const handleSubjectNext = () => {
    setCurrentStep('work');
  };

  useEffect(() => {
    if (visible) {
      setCurrentStep('subject');
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <CustomView
        alignItems={'center'}
        justifyContent={'center'}
        style={{flex: 1, backgroundColor : COLORS.bng.primary}}
        width={'100%'}
        height={'100%'}
      >
          {currentStep === 'work' && (
            <Work 
              onNext={handleWorkNext} 
              initialData={submitWork}
            />
          )}
          {currentStep === 'subject' && (
            <Subject 
              onNext={handleSubjectNext}
              initialData={submitSubjectModule}
            />
          )}
          {currentStep === 'done' && (
            <CustomButton
              text="완료"
              onPress={onClose}
              width="80%"
              height={50}
              backgroundColor={COLORS.brand.primary}
              textColor="white"
            />
          )}
          <CustomButton
            text="뒤로"
            onPress={onClose}
            width= {100}
            height={50}
            backgroundColor={COLORS.brand.primary}
            textColor="white"
            style={{position : 'absolute', bottom : 30, left : '50%', transform : 'translateX(-50%)'}}
          />
      </CustomView>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
});
