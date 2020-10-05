import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, Image } from "react-native";
import { DrawerItems } from "react-navigation-drawer";

const Sidebar = (props) => {
   return (
      <ScrollView style={styles.container}>
         <View style={styles.topSidebar}>
            <Image
               source={require("../assets/logo.png")}
               style={styles.image}
            ></Image>
         </View>
         <View style={{ marginTop: -5 }}>
            <DrawerItems {...props}></DrawerItems>
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: "column",
   },
   topSidebar: {
      paddingVertical: 15,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: "#fff",
   },
   image: {
      width: 100,
      height: 100,
   },
});
export default Sidebar;
