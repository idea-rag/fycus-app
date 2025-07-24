import axios, { AxiosError, AxiosInstance } from 'axios';


const API_BASE_URL = process.env.BASE_URL || 'http:


interface ApiResponse<T = any> {
  message: string;
  data?: T;
  [key: string]: any;
}


interface ApiError {
  code: string;
  message: string;
  details?: any;
}


const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  
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

  
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      if (error.response?.status === 401) {
        
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
      return Promise.reject(error.response?.data || error.message);
    }
  );

  return instance;
};

const apiClient = createApiClient();


export const authApi = {
  
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

  
  logout: (): void => {
    localStorage.removeItem('access_token');
  },
};


export const userApi = {
  
  getInfo: async (): Promise<ApiResponse> => {
    const response = await apiClient.get<ApiResponse>('/userInfo');
    return response.data;
  },
};


export const scheduleApi = {
  
  createSchedule: async (when: number, subjects: any[]): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/schedule-create', {
      when,
      subjects,
    });
    return response.data;
  },
};


export const subjectApi = {
  
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


export const focusApi = {
  
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

  
  sendFeedback: async (whenTime: number, focusData: Record<string, any>): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/focus-feedback', {
      whenTime,
      focus_data: focusData,
    });
    return response.data;
  },
};


export const neurofeedbackApi = {
  
  send: async (when: number, findDog: any, selectSquare: any): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/neurofeedback_send', {
      when,
      find_dog: findDog,
      select_square: selectSquare,
    });
    return response.data;
  },

  
  load: async (): Promise<ApiResponse<{ neurofeedback_data: any[] }>> => {
    const response = await apiClient.get<ApiResponse<{ neurofeedback_data: any[] }>>(
      '/neurofeedback_load'
    );
    return response.data;
  },
};


export const gameApi = {
  
  loadFindDogImages: async (imageNumbers: number[]): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/find_dog_image_load', {
      number: imageNumbers,
    });
    return response.data;
  },
};


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
