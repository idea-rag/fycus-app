import { Image, ImageSourcePropType } from "react-native";

interface IProps {
    source : ImageSourcePropType;
    width : number;
    height : number;
}

export default function CustomImage(props : IProps){
    const {source, width, height} = props;
    return (
        <Image source={source} style={{width, height}}/>
    )
}