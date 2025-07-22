import axios, { AxiosError, AxiosInstance } from 'axios';

// 기본 URL 설정 (환경 변수에서 가져오거나 직접 설정)
const API_BASE_URL = process.env.BASE_URL || 'http://localhost:8000';

// API 응답 타입
interface ApiResponse<T = any> {
  message: string;
  data?: T;
  [key: string]: any;
}

// API 에러 타입
interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// API 클라이언트 생성
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 요청 인터셉터 (토큰 추가)
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      if (error.response?.status === 401) {
        // 토큰 만료 시 로그인 페이지로 리다이렉트
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
      return Promise.reject(error.response?.data || error.message);
    }
  );

  return instance;
};

const apiClient = createApiClient();

// 인증 API
export const authApi = {
  // 회원가입
  register: async (data: {
    userID: string;
    name: string;
    school: string;
    gmail: string;
    password: string;
    grade: string;
    subject_name: string[];
    subject_publish: string[];
    subject_workbook: string[];
    subject_scope: string[];
  }): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/register', data);
    return response.data;
  },

  // 로그인
  login: async (userID: string, password: string): Promise<{ access_token: string }> => {
    const response = await apiClient.post<ApiResponse<{ access_token: string }>>('/login', {
      userID,
      password,
    });
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return { access_token: response.data.access_token };
  },

  // 로그아웃
  logout: (): void => {
    localStorage.removeItem('access_token');
  },
};

// 사용자 API
export const userApi = {
  // 사용자 정보 조회
  getInfo: async (): Promise<ApiResponse> => {
    const response = await apiClient.get<ApiResponse>('/userInfo');
    return response.data;
  },
};

// 일정 API
export const scheduleApi = {
  // 일정 생성/수정
  createSchedule: async (when: number, subjects: any[]): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/schedule-create', {
      when,
      subjects,
    });
    return response.data;
  },
};

// 과목 API
export const subjectApi = {
  // 과목 범위 수정
  modifyScope: async (
    subjectName: string,
    subjectPublish: string,
    subjectWorkbook: string,
    newScope: string
  ): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/scope-modify', {
      subject_name: subjectName,
      subject_publish: subjectPublish,
      subject_workbook: subjectWorkbook,
      new_scope: newScope,
    });
    return response.data;
  },
};

// 집중도 API
export const focusApi = {
  // 집중도 측정 시작
  start: async (data: {
    focusTime: string;
    measureTime?: number;
    whenTime?: number;
    whenDay?: number;
  }): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/focus-start', {
      focusTime: data.focusTime,
      measureTime: data.measureTime || 0,
      whenTime: data.whenTime || 0,
      whenDay: data.whenDay || 0,
    });
    return response.data;
  },

  // 집중도 피드백 전송
  sendFeedback: async (whenTime: number, focusData: Record<string, any>): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/focus-feedback', {
      whenTime,
      focus_data: focusData,
    });
    return response.data;
  },
};

// 뉴로피드백 API
export const neurofeedbackApi = {
  // 뉴로피드백 데이터 전송
  send: async (when: number, findDog: any, selectSquare: any): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/neurofeedback_send', {
      when,
      find_dog: findDog,
      select_square: selectSquare,
    });
    return response.data;
  },

  // 뉴로피드백 데이터 조회
  load: async (): Promise<ApiResponse<{ neurofeedback_data: any[] }>> => {
    const response = await apiClient.get<ApiResponse<{ neurofeedback_data: any[] }>>(
      '/neurofeedback_load'
    );
    return response.data;
  },
};

// 게임 API
export const gameApi = {
  // 개 찾기 게임 이미지 로드
  loadFindDogImages: async (imageNumbers: number[]): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/find_dog_image_load', {
      number: imageNumbers,
    });
    return response.data;
  },
};

// AI API (주석 해제 후 사용 가능)
export const aiApi = {
  getResponse: async (
    userID: string,
    date: string,
    startingTime: number,
    currentSubject: any
  ): Promise<ApiResponse> => {
    const response = await apiClient.get<ApiResponse>('/AI', {
      params: {
        userID,
        date,
        startingTime,
        currentSubject: JSON.stringify(currentSubject),
      },
    });
    return response.data;
  },
};

// 사용 예시:
/*
async function example() {
  try {
    // 로그인
    const { access_token } = await authApi.login('user123', 'password123');
    
    // 사용자 정보 조회
    const userInfo = await userApi.getInfo();
    console.log(userInfo);
    
    // 일정 생성
    await scheduleApi.createSchedule(Date.now(), [{ subject: '수학', time: '19:00' }]);
    
    // 로그아웃
    authApi.logout();
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
}
*/

export default {
  auth: authApi,
  user: userApi,
  schedule: scheduleApi,
  subject: subjectApi,
  focus: focusApi,
  neurofeedback: neurofeedbackApi,
  game: gameApi,
  ai: aiApi,
};
