import CustomView from "@/components/general/CustomView";
import NavBarIcon from "@/components/general/NavBar/NavBarIcon";
import { whereAmI } from "@/feature/whereAmI";
import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { useEffect } from "react";
import MeasureTimeButton from "../MeasureTimeButton";

export default function NavBar(){
    const where = whereAmI('/timePage');
    useEffect(() => {
        console.log(where);
    }, [])

    return(
        <CustomView
            width={'100%'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            paddingHorizontal={SPACING.medium}
            paddingVertical={SPACING.tiny}
            gap={28}
            style={{
                position: 'absolute',
                borderRadius: SPACING.medium,
                bottom: 0,
                borderTopWidth: 1,
                borderLeftWidth : 1,
                borderRightWidth:1,
                borderColor: COLORS.text.forth,
                borderBottomWidth: 0,
                borderStyle: 'solid',
                zIndex: 1000,
                backgroundColor : 'white',
                paddingBottom:24
            }}
        >
            <NavBarIcon name={'시간'} icon={'access-time'} toGo={'/timePage'}/>
            <NavBarIcon name={'일정'} icon={'event'} toGo={'/taskPage'}/>
            <MeasureTimeButton width={50} height={50}/>
            <NavBarIcon name={'AI'} icon={'assistant'} toGo={'/AIPage'}/>
            <NavBarIcon name={'프로필'} icon={'account-circle'} toGo={'/ProfilePage'}/>
        </CustomView>
    )
}