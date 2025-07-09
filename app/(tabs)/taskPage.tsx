import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import SectionDefault from "@/components/general/SectionDefault";
import TaskCalendar from "@/components/TaskPage/TaskCalendar";
import TaskList from "@/components/TaskPage/TaskList";

export default function CalendarPage() {

    const tasks = {
        1 : {
            name : '국어하기',
            importance : 3,
            isChecked : false,
        },
        2: {
            name: '영어하기',
            importance: 2,
            isChecked: true,
        },
        3: {
            name: '수학문제 풀기',
            importance: 2,
            isChecked: false,
        },
        4: {
            name: '운동하기',
            importance: 2,
            isChecked: true,
        },
        5: {
            name: '일기 쓰기',
            importance: 1,
            isChecked: false,
        },
        6: {
            name: '책 읽기',
            importance: 3,
            isChecked: true,
        },
        7: {
            name: '코딩 연습하기',
            importance: 3,
            isChecked: false,
        },
    }

    return (
        <>
        <PageDefault title={'일정'}>
            <SectionDefault title={'오늘의 할일'}>
                <TaskList tasks={tasks}/>
                <TaskCalendar/>
            </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}       