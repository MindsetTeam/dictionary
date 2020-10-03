import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   TouchableOpacity,
   ScrollView,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

export default class Detail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fontSize: 18,
      };
   }
   zoomIn = () => {
      let { fontSize } = this.state;
      if (fontSize > 40) return;
      this.setState({
         fontSize: fontSize + 2,
      });
   };

   zoomOut = () => {
      let { fontSize } = this.state;
      if (fontSize < 10) return;
      this.setState({
         fontSize: fontSize - 2,
      });
   };
   render() {
      const { navigation } = this.props;
      return (
         <View style={styles.container}>
            <View style={styles.controlsContainer}>
               <TouchableOpacity style={styles.control}>
                  <Ionicons name="ios-arrow-back" size={20} color="#fff" />
               </TouchableOpacity>
               <TouchableOpacity style={styles.control}>
                  <Ionicons name="ios-arrow-forward" size={20} color="#fff" />
               </TouchableOpacity>
               <TouchableOpacity style={styles.control} onPress={this.zoomIn}>
                  <Feather name="zoom-in" size={20} color="#fff" />
               </TouchableOpacity>
               <TouchableOpacity style={styles.control} onPress={this.zoomOut}>
                  <Feather name="zoom-out" size={20} color="#fff" />
               </TouchableOpacity>
            </View>
            <ScrollView style={styles.textContainer}>
               <Text
                  style={{ paddingBottom: 15, fontSize: this.state.fontSize }}
               >
                  Detail Screen {navigation.getParam("id")}
               </Text>
               <Text style={{ fontSize: this.state.fontSize }}>
                  {navigation.getParam("body")}
               </Text>
            </ScrollView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   controlsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: "#aaa",
   },
   control: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
   },
   textContainer: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 10,
   },
});
