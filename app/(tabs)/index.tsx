import TODOComponent from "@/components/TODO/TODOComponent";
import {StyleSheet} from "react-native";

export default function HomeScreen() {
  return (
    <>
      <TODOComponent name={"asdf"} importance={3} onChange={() => {console.log('ss')}}/>
    </>
  );
}

const styles = StyleSheet.create({
  container : {
    width : '100%',
    height : '100%'
  }
})