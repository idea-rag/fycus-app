import CustomText from "../CustomText";
import CustomView from "../CustomView";

export default function Loading() {
    return (
        <CustomView
            width={'100%'}
            height={'100%'}
            style={{
                backgroundColor : 'rgba(255, 255, 255, 0.5)',
                position : "absolute",
                justifyContent : "center",
                alignItems : "center",
                zIndex : 9999
            }}
        >
            <CustomText
            >
                Loading...
            </CustomText>
        </CustomView>
    );
}