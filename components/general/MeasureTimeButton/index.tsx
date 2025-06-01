import { COLORS } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import CustomView from "../CustomView";

interface IProps {
    width ?: number,
    height ?: number,
}

export default function MeasureTimeButton(props : IProps) {
    const {width, height} = props;
    return ( 
        <CustomView
            width={width || 75}
            height={height || 75}
            borderRadius={(width || 75) / 2}
            alignItems={'center'}
            justifyContent={'center'}
            style={{
                backgroundColor : COLORS.brand.primary,
            }}
        >
            <FontAwesome name="play" size={30} color="white" />
        </CustomView>
    )
}

 