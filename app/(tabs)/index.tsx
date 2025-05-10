import {StyleSheet, Text, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {SPACING} from "@/styles/spacing";
import {FONTS} from "@/styles/fonts";
import {COLORS} from "@/styles/colors";
import Header from "@/components/MainPage/Header";
import FocusSection from "@/components/MainPage/FocusSection";

export default function HomeScreen() {
  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Header/>
          <View style={styles.headContainer}>
            <Text style={styles.headContainerHead}>안녕하세요 류한석님!</Text>
            <Text style={styles.headContainerBody}>어제의 공부시간은 12시간이었어요, 오늘 하루도 열심히 화이팅!</Text>
          </View>
          <FocusSection/>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    gap: SPACING.medium
  },
  headContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: SPACING.superTiny,
    paddingHorizontal: SPACING.medium,
  },
  headContainerHead:{
    fontSize: FONTS.size.head,
    color: COLORS.text.primary
  },
  headContainerBody:{
    fontSize: FONTS.size.small,
    color: COLORS.text.third
  }
})