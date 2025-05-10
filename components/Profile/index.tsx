import {Image} from "expo-image";

interface IProps {
    width: number;
    height: number;
}

export default function Profile({width, height}: IProps) {
    return(
        <Image source={require('@/assets/images/favicon.png')}
               style={{ width, height}}
        />
    )
}