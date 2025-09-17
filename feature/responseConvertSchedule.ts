interface SubjectTask {
    subject: string;
    publish: string;
    workbook: string;
    scope: string;
    importance: number;
    isFinished: boolean;
  }
  
  interface DayPlan {
    [key: string]: SubjectTask[];
  }
  
  interface WeekPlan {
    day1: SubjectTask[];
    day2: SubjectTask[];
    day3: SubjectTask[];
    day4: SubjectTask[];
    day5: SubjectTask[];
    day6: SubjectTask[];
    day7: SubjectTask[];
  }
  
  interface ScheduleEntry {
    name: string;
    weekplan: WeekPlan;
  }
  
  interface AISchedule {
    [date: string]: {
      [weekNumber: string]: ScheduleEntry[];
    };
  }
  
  interface ScheduleResponse {
    message: string;
    ai_schedule: AISchedule;
  }
  
  // Example us
  // age:
  // const schedule: ScheduleResponse = {...};
  export default function responseConvertSchedule(data: ScheduleResponse): Record<string, Array<{
    name: string;
    importance: number;
    isChecked: boolean;
  }>> {
    const result: Record<string, Array<{
      name: string;
      importance: number;
      isChecked: boolean;
    }>> = {};
  
    // Get the first date in the schedule
    const date = Object.keys(data.ai_schedule)[0];
    if (!date) return result;
  
    const weekPlans = Object.values(data.ai_schedule[date])[0];
    if (!weekPlans || weekPlans.length === 0) return result;
  
    const weekPlan = weekPlans[0].weekplan;
  
    // Helper function to format task name
    const formatTaskName = (task: SubjectTask) => 
      `${task.workbook} - ${task.publish} - ${task.scope}`;
  
    // Convert each day's tasks to the target format
    (Object.entries(weekPlan) as [string, SubjectTask[]][]).forEach(([day, tasks]) => {
      // Calculate the date for this day (assuming day1 is the first date)
      const dayNumber = parseInt(day.replace('day', ''));
      const taskDate = new Date(date);
      taskDate.setDate(taskDate.getDate() + dayNumber - 1);
      const dateString = taskDate.toISOString().split('T')[0];
  
      result[dateString] = tasks.map(task => ({
        name: formatTaskName(task),
        importance: task.importance,
        isChecked: task.isFinished
      }));
    });
  
    return result;
  }