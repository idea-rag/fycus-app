import CustomView from "@/components/general/CustomView";
import {SPACING} from "@/styles/spacing";
import HourSection from "@/components/TimePage/FocusByHourDetail/HourSection";
import AISection from "@/components/TimePage/FocusByHourDetail/AISection";

export default function FocusByHourDetail() {
    return(
        <CustomView
            width={'100%'}
            paddingHorizontal={SPACING.medium}
            flexDirection={'column'}
            alignItems={'center'}
            gap={SPACING.medium}
            justifyContent={'center'}
            >
            <HourSection time={11}/>
            <AISection message={'30분대에 무슨 일이 있었나요? 급격히 집중력이 떨어졌네요.\n' +
                '그래도 꽤나 많은 집중을 이루어냈습니다!'}/>
        </CustomView>
    )
}