import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  AsyncStorage,
  DeviceEventEmitter,
} from "react-native";
import ListItem from "../../components/ListItem";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyWords: [],
      loading: true,
    };
  }
  async componentDidMount() { 
    const data = await AsyncStorage.getItem("historyWords");
    let arrayData = [];
    if (data) {
      let array = JSON.parse(data);
      if (Array.isArray(array)) {
        arrayData.push(...array);
      } else {
        arrayData.push(array);
      }
    }
    this.setState({
      historyWords: arrayData,
      loading: false,
    });
    DeviceEventEmitter.addListener("hi", async () => {
      const data = await AsyncStorage.getItem("historyWords");
      let array = JSON.parse(data);
      this.setState({
        favoriteWords: array,
        historyWords: array,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#6A0E00" size="large"></ActivityIndicator>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.state.historyWords?.length > 0 && (
          <FlatList
            data={this.state.historyWords}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem
                navigation={this.props.navigation}
                word={item}
              ></ListItem>
            )}
          ></FlatList>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textSearch: {
    padding: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  wordNotFound: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
  },
});
