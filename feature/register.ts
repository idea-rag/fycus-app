import { authApi } from "@/http/apiRequest";
import useFormStore from "@/store/useForm";
import { Alert } from 'react-native';

interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: {
    id: number;
    email: string;
    name: string;
  };
}


interface FormState {
  submitSubjectModule: Array<{
    subject: string;
    publisher: string;
    work: string[];
  }>;
  submitSchool: string;
  submitGrade: string;
  submitName: string;
  submitGmail: string;
  submitPassword: string;
}

export const register = async (): Promise<RegisterResponse> => {
  
  const state = useFormStore.getState();
  
  
  const {
    submitSubjectModule = [],
    submitSchool = '',
    submitGrade = '',
    submitName = '',
    submitGmail = '',
    submitPassword = ''
  } = state as unknown as FormState;

  
  if (!submitGmail || !submitPassword || !submitName) {
    Alert.alert('오류', '이메일, 비밀번호, 이름은 필수 항목입니다.');
    return { success: false, message: 'Required fields are missing' };
  }

  try {
    
    const registerData = {
      userID: submitGmail, 
      name: submitName,
      school: submitSchool,
      gmail: submitGmail,
      password: submitPassword,
      grade: submitGrade,
      subject_name: submitSubjectModule.map(item => item.subject),
      subject_publish: submitSubjectModule.map(item => item.publisher),
      subject_workbook: submitSubjectModule.flatMap(item => item.work),
      subject_scope: ['국어'] 
    };

    const response = await authApi.register(registerData);
    
    if (response && response.data) {
      return {
        success: true,
        message: '회원가입이 완료되었습니다.',
        data: {
          id: response.data.id || 0,
          email: submitGmail,
          name: submitName
        }
      };
    }
    
    return { success: false, message: '회원가입 처리 중 오류가 발생했습니다.' };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.';
    Alert.alert('회원가입 실패', errorMessage);
    return { success: false, message: errorMessage };
  }
};


export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};


export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: '비밀번호는 최소 8자 이상이어야 합니다.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: '비밀번호에 대문자가 포함되어야 합니다.' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: '비밀번호에 숫자가 포함되어야 합니다.' };
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return { isValid: false, message: '비밀번호에 특수문자가 포함되어야 합니다.' };
  }
  return { isValid: true, message: '유효한 비밀번호입니다.' };
};