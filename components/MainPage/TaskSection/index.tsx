import DefaultSection from "@/components/DefaultSection";
import {View} from "react-native";
import TaskFrame from "@/components/MainPage/TaskSection/TaskFrame";

export default function TaskSection() {

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
       <DefaultSection title={'오늘의 할일'}>
           <TaskFrame tasks={tasks} />
       </DefaultSection>
    );
}