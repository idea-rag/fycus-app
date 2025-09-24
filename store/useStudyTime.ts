import { create } from "zustand";
interface TimeSlot {
    measureTime: number;
    focusTime: number;
  }
  
  interface StudyTimeState {
    focusData: {
      whenDay: string;
      timeSlots: Record<string, TimeSlot>;
      totalMeasureTime: number | 0;
      totalFocusTime: number | 0;
    };
    updateFocusData: (timeSlot: string, measureTime: number, focusTime: number) => void;
    resetDailyData: () => void;
  }
  
  const useStudyTimeStore = create<StudyTimeState>((set) => ({
    focusData: {
      whenDay: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      timeSlots: {},
      totalMeasureTime: 0,
      totalFocusTime: 0,
    },
    updateFocusData: (timeSlot, measureTime, focusTime) => 
      set((state) => {
        const newTimeSlots = {
          ...state.focusData.timeSlots,
          [timeSlot]: {
            measureTime,
            focusTime
          }
        };
        
        // Calculate totals with type safety
        const totalMeasureTime = Object.values(newTimeSlots).reduce<number>(
          (sum, slot) => {
            const measureTime = Number(slot?.measureTime) || 0;
            return sum + measureTime;
          },
          0
        );
        
        const totalFocusTime = Object.values(newTimeSlots).reduce<number>(
          (sum, slot) => {
            const focusTime = Number(slot?.focusTime) || 0;
            return sum + focusTime;
          },
          0
        );
  
        return {
          focusData: {
            ...state.focusData,
            timeSlots: newTimeSlots,
            totalMeasureTime,
            totalFocusTime
          }
        };
      }),
    resetDailyData: () => 
      set(() => ({
        focusData: {
          whenDay: new Date().toISOString().split('T')[0],
          timeSlots: {},
          totalMeasureTime: 0,
          totalFocusTime: 0,
        }
      }))
  }));

export { useStudyTimeStore };