import CustomView from "@/components/general/CustomView";
import {TimeBar} from "@/components/TimePage/TimeBar";

export default function FocusByHourSection() {
    return (
        <CustomView>
            <TimeBar width={18} height={136} isDetail={true} focusTime={7} measureTime={10} maxTime={10}/>
        </CustomView>
    )
}