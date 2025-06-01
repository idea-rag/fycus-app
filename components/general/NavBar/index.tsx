import CustomView from "@/components/general/CustomView";
import NavBarIcon from "@/components/general/NavBar/NavBarIcon";
import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import MeasureTimeButton from "../MeasureTimeButton";

export default function NavBar(){
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
                <NavBarIcon name={'시간'} icon={'clock-o'}/>
                <NavBarIcon name={'일정'} icon={'calendar'}/>
            </CustomView>
            <CustomView
                flexDirection={'row'}
                gap={20}
                paddingHorizontal={SPACING.medium}
                paddingVertical={SPACING.superTiny}
            >
                <NavBarIcon name={'AI'} icon={'headphones'}/>
                <NavBarIcon name={'일정'} icon={'user-circle-o'}/>
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
                    transform: [{ translateX: -20}],
                    borderWidth : 1,
                    borderColor : COLORS.text.forth,
                }}
            >
                <MeasureTimeButton width={70} height={70}/>
            </CustomView>
        </CustomView>
    )
}