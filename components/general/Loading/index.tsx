import CustomText from "../CustomText";
import CustomView from "../CustomView";

export default function Loading() {
    return (
        <CustomView
            width={'100%'}
            height={'100%'}
            style={{
                backgroundColor : '#ffffff',
                position : "absolute",
                justifyContent : "center",
                alignItems : "center",
                zIndex : 99999
            }}
        >
            <CustomText
            >
                Loading...
            </CustomText>
        </CustomView>
    );
}