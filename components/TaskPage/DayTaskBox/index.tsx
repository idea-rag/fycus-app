import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import TaskComponent from "@/components/general/TaskComponent";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

type TaskType = {
    name: string;
    importance: number;
    isChecked: boolean;
    whatDay: string;
}

interface IProps {
    tasks: TaskType[];
    selectedDate: string; // 선택된 날짜를 전달받을 prop 추가
}

export default function DayTaskBox(props: IProps) {
    const { tasks, selectedDate } = props;
    return (
       <CustomView
        width={'100%'}
        alignItems={'flex-start'}
        justifyContent={'flex-start'}
        style={{paddingTop: 20, minHeight: 100}}
        gap={SPACING.small}
       >
        <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} fontWeight={'500'}>
            할 일
        </CustomText>
        <CustomView
            width={'100%'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            gap={SPACING.tiny}
        >
        {tasks.length > 0 ? (
            tasks.map((task, index) => (
                <TaskComponent
                    key={index}
                    name={task.name}
                    importance={task.importance}
                    isChecked={task.isChecked}
                    whatDay={task.whatDay || selectedDate} // task에 whatDay가 없으면 selectedDate 사용
                />
            ))
        ) : (
            <CustomText>선택된 날짜에 할 일이 없습니다.</CustomText>
        )}
        </CustomView>
       </CustomView>
    )
}