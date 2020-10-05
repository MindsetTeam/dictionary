import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  AsyncStorage,
  Text,
  DeviceEventEmitter,
} from "react-native";
import ListItem from "../../components/ListItem";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteWords: [],
      loading: true,
      filterData: [],
    };
  }
  async componentDidMount() {
    const data = await AsyncStorage.getItem("favoriteWords");
    let arrayData = [];
    if (data) {
      let array = JSON.parse(data);
      if (Array.isArray(array)) {
        arrayData.push(...array);
      } else {
        arrayData.push(array);
      }
    }
    console.log(arrayData);
    this.setState({
      favoriteWords: arrayData,
      filterData: arrayData,
      loading: false,
    });
    DeviceEventEmitter.addListener("hi", async () => {
      const data = await AsyncStorage.getItem("favoriteWords");
      let array = JSON.parse(data);
      this.setState({
        favoriteWords: array,
        filterData: array,
      });
    });
  }

  handleSearchTextChange = (value) => {
    if (value != "") {
      this.setState({
        filterData: this.state.favoriteWords.filter((v) =>
          v.toLowerCase().includes(value.toLowerCase())
        ),
      });
      return;
    }
    this.setState({
      filterData: this.state.favoriteWords,
    });
  };
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
        <TextInput
          style={styles.textSearch}
          placeholder="ស្វែងរកពាក្យចំណាំ"
          onChangeText={this.handleSearchTextChange}
          autoCorrect={false}
        ></TextInput>
        {this.state.filterData?.length > 0 && (
          <FlatList
            data={this.state.filterData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem
                navigation={this.props.navigation}
                word={item}
              ></ListItem>
            )}
          ></FlatList>
        )}
        {this.state.filterData?.length === 0 && (
          <ScrollView style={styles.wordNotFound}>
            <Text>ពាក្យចំណាំមិនទាន់​មាន</Text>
          </ScrollView>
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
