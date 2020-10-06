import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

export default class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}> អំពីពួកយើង </Text>
        <View>
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 100, height: 100 }}
          ></Image>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 15,
    alignItems: "center",
  },
});
