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
            justifyContent={'space-between'}
            paddingHorizontal={SPACING.medium}
            style={{
                position: 'absolute',
                bottom: 24,
                borderTopWidth: 1,
                borderTopColor: COLORS.text.forth,
                borderStyle: 'solid',
            }}
        >
            <CustomView
                flexDirection={'row'}
                gap={20}
                paddingHorizontal={SPACING.medium}
                paddingVertical={SPACING.superTiny}
            >
                <NavBarIcon name={'시간'} icon={'clock-o'} toGo={'/timePage'}/>
                <NavBarIcon name={'일정'} icon={'calendar'} toGo={'/taskPage'}/>
            </CustomView>
            <CustomView
                flexDirection={'row'}
                gap={20}
                paddingHorizontal={SPACING.medium}
                paddingVertical={SPACING.superTiny}
            >
                <NavBarIcon name={'AI'} icon={'headphones'} toGo={'/(tabs)/AIPage'}/>
                <NavBarIcon name={'프로필'} icon={'user-circle-o'} toGo={'/ProfilePage'}/>
            </CustomView>
            <CustomView
                width={80}
                height={80}
                alignItems={'center'}
                justifyContent={'center'}
                style={{
                    backgroundColor : COLORS.bng.primary,
                    borderRadius : 50,
                    position : 'absolute',
                    top : -40,
                    left: '50%',
                    transform: [{ translateX: -24}],
                    borderWidth : 1,
                    borderColor : COLORS.text.forth,
                }}
            >
                <MeasureTimeButton width={70} height={70}/>
            </CustomView>
        </CustomView>
    )
}