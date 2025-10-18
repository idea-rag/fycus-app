import { ActivityIndicator } from 'react-native';
import CustomText from "../CustomText";
import CustomView from "../CustomView";
import {COLORS} from "@/styles/colors";

export default function Loading() {
    return (
        <CustomView
            width={'100%'}
            height={'100%'}
            style={{
                flex : 1,
                backgroundColor : 'rgba(255, 255, 255, 1)',
                position : "absolute",
                justifyContent : "center",
                alignItems : "center",
                zIndex : 999999
            }}
        >
            <ActivityIndicator 
                size="large" 
                color={COLORS.brand.primary}
                style={{ marginBottom: 10 }}
            />
            <CustomText fontSize={16}>
                생성 중...
            </CustomText>
        </CustomView>
    );
}