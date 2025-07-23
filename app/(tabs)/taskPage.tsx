import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import SectionDefault from "@/components/general/SectionDefault";
import TaskCalendar from "@/components/TaskPage/TaskCalendar";
import TaskList from "@/components/TaskPage/TaskList";
import { MonthTasks } from "@/data/scehdule";

export default function CalendarPage() {

    return (
        <>
        <PageDefault title={'일정'}>
            <SectionDefault title={'오늘의 할일'}>
                <TaskList tasks={MonthTasks['2025-07-24']}/>
                <TaskCalendar MonthTasks={MonthTasks}/>
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}       