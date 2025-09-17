import { create } from "zustand";

interface Task {
  name: string;
  importance: number;
  isChecked: boolean;
}

interface ScheduleState {
  // The schedule data structure that matches your MonthTasks format
  schedule: Record<string, Task[]>;
  
  // Actions
  setSchedule: (newSchedule: Record<string, Task[]>) => void;
  updateTaskStatus: (date: string, taskIndex: number, isChecked: boolean) => void;
  addTask: (date: string, task: Task) => void;
  removeTask: (date: string, taskIndex: number) => void;
  clearDate: (date: string) => void;
  getTasksForDate: (date: string) => Task[];
}

const useScheduleStore = create<ScheduleState>((set, get) => ({
  // Initial state
  schedule: {},
  
  // Set the entire schedule
  setSchedule: (newSchedule) => set({ schedule: newSchedule }),
  
  // Update a task's checked status
  updateTaskStatus: (date, taskIndex, isChecked) => 
    set((state) => {
      const newSchedule = { ...state.schedule };
      if (newSchedule[date]?.[taskIndex]) {
        newSchedule[date] = [...newSchedule[date]];
        newSchedule[date][taskIndex] = {
          ...newSchedule[date][taskIndex],
          isChecked
        };
      }
      return { schedule: newSchedule };
    }),
  
  // Add a new task to a specific date
  addTask: (date, task) =>
    set((state) => ({
      schedule: {
        ...state.schedule,
        [date]: [...(state.schedule[date] || []), task]
      }
    })),
  
  // Remove a task from a date
  removeTask: (date, taskIndex) =>
    set((state) => {
      if (!state.schedule[date]) return state;
      
      const newTasks = [...state.schedule[date]];
      newTasks.splice(taskIndex, 1);
      
      return {
        schedule: {
          ...state.schedule,
          [date]: newTasks
        }
      };
    }),
  
  // Clear all tasks for a specific date
  clearDate: (date) =>
    set((state) => {
      const newSchedule = { ...state.schedule };
      delete newSchedule[date];
      return { schedule: newSchedule };
    }),
  
  // Helper to get tasks for a specific date
  getTasksForDate: (date) => {
    return get().schedule[date] || [];
  }
}));

export default useScheduleStore;