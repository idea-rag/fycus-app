import ApiClient from "../http/https";

interface TimeSlot {
  measureTime: number;
  focusTime: number;
}

interface FocusData {
  timeSlots: Record<string, TimeSlot>;
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

interface FeedbackParams {
  token: string;
  focusData: FocusData;
  studyData: StudyData;
}

export const getFeedback = async ({ token, focusData    , studyData }: FeedbackParams) => {
  const apiClient = new ApiClient();
  apiClient.setToken(token);
  
  try {
    // 현재 날짜를 YYYY-MM-DD 형식으로 변환
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const whenDay = `${year}-${month}-${day}`;
    
    const requestData = {
      whenDay: whenDay,
      timeSlots:  {
        "14-30": { "measureTime": 10, "focusTime": 2 },
        "14-35": { "measureTime": 10, "focusTime": 8 }
      },  // focus_data 대신 timeSlots을 직접 전달
      studyData: studyData
    };
    
    console.log('Sending to submitFocusFeedback:', JSON.stringify(requestData, null, 2));
    
    const response = await apiClient.submitFocusFeedback(requestData);
    
    console.log('Response from submitFocusFeedback:', response);
    
    // response.data가 아니라 response 자체를 반환
    return response;
  } catch (error) {
    console.error('Error in getFeedback:', error);
    throw error;
  }
};