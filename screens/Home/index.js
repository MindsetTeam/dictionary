import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class index extends Component {
   render() {
      return (
         <View>
            <Text> Home Screen </Text>
            <TouchableOpacity
               onPress={() => this.props.navigation.navigate("Detail")}
            >
               <Text>Go Detail</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({});
