import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

import Drawer from "./routes/drawer";

export default class AppNavigator extends Component {
   render() {
      return <Drawer></Drawer>;
   }
}

const styles = StyleSheet.create({});
