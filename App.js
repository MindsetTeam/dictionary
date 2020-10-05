import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";


import AppNavigator from "./AppNavigator";

export default function App() {
   // useEffect( async ()=>{
   //    const favoriteWords = await AsyncStorage.getItem('favoriteWords');
   //    if(favoriteWords){
   //       AsyncStorage.setItem('favoriteWords', '');
   //       console.log("hi");
   //    }else{
   //       console.log("object");
   //    }
   // },[])

   return (
      // <View style={styles.container}>
      //    <Text>Open up App.js to start working on your app!</Text>
      //  <StatusBar style="auto" />
      // </View>
      <AppNavigator></AppNavigator>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});
