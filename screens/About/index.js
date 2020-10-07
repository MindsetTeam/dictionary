import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

export default class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.aboutUsContainer}>
          <View>
            <Text style={{ fontSize: 20 }}> អំពីពួកយើង </Text>
            <View>
              <Image
                source={require("../../assets/logo.png")}
                style={{ width: 100, height: 100, marginTop: 10 }}
              ></Image>
            </View>
          </View>
          <View style={styles.aboutUsTextContainer}>
            <Text>lorem sadf asdfasdf asdfasdf asdfasdf</Text>
            <TouchableOpacity
              style={styles.btnWebVersion}
              onPress={() => {
                Linking.openURL("http://www.moj.gov.kh/kh/dictionary");
              }}
            >
              <Text style={{ color: "#fff" }}>Web Version</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.teamMember}>
          <Feather name="users" size={30} color="black" />
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text>SrunScotty</Text>
            <Text>KhmerBigBoy</Text>
            <Text>HellO</Text>
          </View>
        </View>
        <View style={styles.contact}>
          <Feather name="users" size={30} color="black" />
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text>SrunScotty</Text>
            <Text>KhmerBigBoy</Text>
            <Text>HellO</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    alignItems: "center",
  },
  aboutUsContainer: {
    flexDirection: "row",
  },
  aboutUsTextContainer: {
    paddingTop: 20,
    marginLeft: 20,
    width: 120,
  },
  btnWebVersion: {
    backgroundColor: "#002164",
    alignItems: "center",
    paddingVertical: 7,
    marginTop: 15,
  },
  teamMember: {
    marginVertical: 60,
    alignItems: "center",
  },
  contact: {
    alignItems: "center",
  },
});
