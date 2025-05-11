import CustomView from "@/components/general/CustomView";
import {FontAwesome} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
export default function MeasureTimeButton() {
    return (
        <LinearGradient
            colors={['#D6A7FF', '#A238FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} // 45도 방향
            style={styles.container}
        >
            <FontAwesome name="play" size={30} color="white" />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
})