import CustomView from "@/components/general/CustomView";
import NavBarIcon from "@/components/general/NavBar/NavBarIcon";

export default function NavBar(){
    return(
        <CustomView
            width={'100%'}
            flexDirection={'row'}
        >
            <CustomView>
                <NavBarIcon name={'시간'} icon={'clock-o'}/>
                <NavBarIcon name={'일정'} icon={'calendar'}/>
            </CustomView>
            <CustomView>
                <NavBarIcon name={'일정'} icon={'calendar'}/>

            </CustomView>
        </CustomView>
    )
}