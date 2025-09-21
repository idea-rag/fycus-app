import TaskFrame from "@/components/MainPage/TaskSection/TaskFrame";
import SectionDefault from "../../general/SectionDefault";

interface Task {
    name: string;
    importance: number;
    isChecked: boolean;
    whatDay: string;
}

interface IProps {
    tasks: {
        [key: string]: Task[];
    };
}

export default function TaskSection(props : IProps) {
    const {tasks} = props;

    return (
       <SectionDefault title={'오늘의 할일'}>
           <TaskFrame tasks={tasks} />
       </SectionDefault>
    );
}