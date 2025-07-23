import FocusTimeCard from "@/components/MainPage/FocusSection/FocusTimeCard";
import { SPACING } from "@/styles/spacing";
import { navigate } from "expo-router/build/global-state/routing";
import { ScrollView, StyleSheet } from "react-native";
import SectionDefault from "../../general/SectionDefault";

interface IProps {
    focusTimeList : {isFocus : boolean, time : number, day : number, isNotPassed : boolean}[];   
}

export default function FocusSection(props : IProps) {
    const {focusTimeList} = props;

    return (
        <SectionDefault
            title={"일주일간 집중내역"}
            titleLinkText={"자세히 보러가기"}
            onHandleLinkTextClick={() => navigate('/(tabs)/timePage')}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.focusTimeContainer}
            >
                {focusTimeList.map((item, index) => (
                    <FocusTimeCard
                        key={index}
                        isFocus={item.isFocus}
                        time={item.time}
                        day={item.day}
                        isNotPassed={item.isNotPassed}
                    />
                ))} 
            </ScrollView>
        </SectionDefault>
    );
}


const styles = StyleSheet.create({
    focusTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.small,
    },
});

