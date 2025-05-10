import {View} from "react-native";
import Logo from "@/components/Logo";
import Profile from "@/components/Profile";
import {StyleSheet} from "react-native";
import {SPACING} from "@/styles/spacing";


export default function Header(){
    return(
        <View style={styles.container}>
            <Logo width={30} height={30}/>
            <Profile width={30} height={30}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        paddingVertical : SPACING.superTiny,
        paddingHorizontal : SPACING.medium,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})