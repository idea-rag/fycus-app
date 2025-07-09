import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";

type TaskType = {
    name: string;
    importance: number;
    isChecked: boolean;
}
interface IProps {
    tasks : TaskType[]
}

export default function DayTaskBox(props : IProps) {
    const {tasks} = props;
    return (
       <CustomView
        width={'100%'}
        alignItems={'flex-start'}
        justifyContent={'flex-start'}
        style={{paddingTop: 20, minHeight: 100}}
       >
        {tasks.length > 0 ? (
            tasks.map((task, index) => (
                <CustomText key={`${task.name}-${index}`} style={{paddingVertical: 4}}>
                    {task.name}
                </CustomText>
            ))
        ) : (
            <CustomText>선택된 날짜에 할 일이 없습니다.</CustomText>
        )}
       </CustomView>
    )
}