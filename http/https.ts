// DTOs (Data Transfer Objects)
interface RegisterDTO {
    userID: string;
    name: string;
    school: string;
    grade: string;
    email: string;
    password: string;
    subject_name: string[];
    subject_publish: string[];
    subject_BookList: string[];
    focus_Grade: string[];
    Subject_Module: Record<string, any>[];
    Focus_Subject: string;
    WhatWeek: string;
  }
  
  interface LoginDTO {
    userID: string;
    password: string;
  }
  
  interface ScopeModifyDTO {
    subject_name: string;
    subject_publish: string;
    subject_workbook: string;
    new_scope: string;
  }
  
  interface FocusStartDTO {
    focusTime: string;
    measureTime?: number;
    startTime: number;  // Unix timestamp for start time
    endTime: number;    // Unix timestamp for end time
    whenDay?: number;
  }
  
  interface TimeSlot {
    measureTime: number;
    focusTime: number;
  }

  interface StudyTask {
    name: string;
    importance: number;
    isChecked: boolean;
    whatDay: string;
  }

  interface StudyData {
    [date: string]: StudyTask[];
  }

  interface FocusFeedbackDTO {
    whenDay: string;
    timeSlots: Record<string, TimeSlot>;
    studyData: StudyData;
  }
  
  interface NeurofeedbackSendDTO {
    when: number;
    find_dog: Record<string, any>;
    select_square: Record<string, any>;
  }
  
  interface FindDogImageLoadDTO {
    number: number[];
  }
  
  interface ScheduleDTO {
    when: number;
    subjects: Record<string, any>[];
    goal: string;
  }
  
  interface AIResponseDTO {
    userID: string;
    date: string;
    startingTime: number;
    currentSubject: Record<string, any>;
  }
  
  // Response interfaces
  interface ApiResponse<T = any> {
    message?: string;
    access_token?: string;
    userInfo?: T;
    ai_schedule?: T;
    ai_feedback?: T;
    neurofeedback_data?: T[];
    successes?: T[];
    errors?: T[];
    [key: string]: any;
  }
  
  interface ErrorResponse {
    code: string;
    message: string;
    details: Record<string, any>;
  }
  
  class ApiClient {
    private baseUrl: string;
    private token: string | null = null;
  
    constructor(baseUrl: string = process.env.EXPO_PUBLIC_API_URL || 'http://fycus.kr') {
      this.baseUrl = baseUrl;
    }
  
    // Set authentication token
    setToken(token: string): void {
      this.token = token;
    }
  
    // Get authentication headers
    private getHeaders(): HeadersInit {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',  // 이 헤더 추가
        'Accept': 'application/json',
      };
      
      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }
      
      return headers;
    }
  
    // Generic request method
    private async request<T>(
      endpoint: string,
      method: string = 'GET',
      body?: any
    ): Promise<T> {
      try {
        const url = `${this.baseUrl}${endpoint}`;
        const config: RequestInit = {
          method,
          headers: this.getHeaders(),
        };
  
        if (body && method !== 'GET') {
          config.body = JSON.stringify(body);
        }
  
        const response = await fetch(url, config);
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || `HTTP Error: ${response.status}`);
        }
  
        return data;
      } catch (error) {
        console.error(`API Request failed for ${endpoint}:`, error);
        throw error;
      }
    }
  
    // Main endpoint
    async getMain(): Promise<{ message: string }> {
      try {
        return await this.request<{ message: string }>('/');
      } catch (error) {
        throw new Error(`Failed to get main: ${error}`);
      }
    }
  
    // User registration
    async register(data: RegisterDTO): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/register', 'POST', data);
      } catch (error) {
        throw new Error(`Registration failed: ${error}`);
      }
    }
  
    // User login
    async login(data: LoginDTO): Promise<ApiResponse> {
      try {
        const response = await this.request<ApiResponse>('/login', 'POST', data);
        
        // Store token if login successful
        if (response.access_token) {
          this.setToken(response.access_token);
        }
        
        return response;
      } catch (error) {
        throw new Error(`Login failed: ${error}`);
      }
    }
  
    // Get user info
    async getUserInfo(): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/userInfo');
      } catch (error) {
        throw new Error(`Failed to get user info: ${error}`);
      }
    }
  
    // Create schedule
    async createSchedule(data: ScheduleDTO): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/schedule-create', 'POST', data);
      } catch (error) {
        throw new Error(`Failed to create schedule: ${error}`);
      }
    }
  
    // Modify scope
    async modifyScope(data: ScopeModifyDTO): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/scope-modify', 'POST', data);
      } catch (error) {
        throw new Error(`Failed to modify scope: ${error}`);
      }
    }
  
    // Start focus
    async startFocus(data: FocusStartDTO): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/focus-start', 'POST', data);
      } catch (error) {
        throw new Error(`Failed to start focus: ${error}`);
      }
    }
  
    // Submit focus feedback
    async submitFocusFeedback(data: FocusFeedbackDTO): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/focus-feedback', 'POST', data);
      } catch (error) {
        throw new Error(`Failed to submit focus feedback: ${error}`);
      }
    }
  
    // Send neurofeedback
    async sendNeurofeedback(data: NeurofeedbackSendDTO): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/neurofeedback_send', 'POST', data);
      } catch (error) {
        throw new Error(`Failed to send neurofeedback: ${error}`);
      }
    }
  
    // Load neurofeedback data
    async loadNeurofeedback(): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/neurofeedback_load');
      } catch (error) {
        throw new Error(`Failed to load neurofeedback: ${error}`);
      }
    }
  
    // Load find dog images
    async loadFindDogImages(data: FindDogImageLoadDTO): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/find_dog_image_load', 'POST', data);
      } catch (error) {
        throw new Error(`Failed to load find dog images: ${error}`);
      }
    }
  
    // AI Response (commented in original code, but included for completeness)
    async getAIResponse(data: AIResponseDTO): Promise<ApiResponse> {
      try {
        return await this.request<ApiResponse>('/AI', 'GET', data);
      } catch (error) {
        throw new Error(`Failed to get AI response: ${error}`);
      }
    }
  }
  
  // Usage example
  export default ApiClient;