import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ListItem from "../../components/ListItem";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      filterData: null,
      searchText: "",
    };
  }

  componentDidMount() {
    fetch("http://www.moj.gov.kh/lookup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "page=1&word=%E1%9E%80&funcName=getWordList&lang=kh&ajax=1",
    })
      .then((res) => res.text())
      .then((data1) => {
        const data = JSON.parse(data1);
        if (data[0] > 10) {
          fetch("http://www.moj.gov.kh/lookup", {
            method: "POST",
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "page=2&word=%E1%9E%80&funcName=getWordList&lang=kh&ajax=1",
          })
            .then((res) => res.text())
            .then((data2) => {
              const dataParse2 = JSON.parse(data2);
              this.setState({
                loading: false,
                data: [...data[1], ...dataParse2[1]],
                filterData: [...data[1], ...dataParse2[1]],
              });
            });
        } else {
          if (data[1])
            this.setState({
              loading: false,
              data: data[1],
              filterData: data[1],
            });
        }
      });
  }

  handleSearchTextChange = (value) => {
    if (this.timeoutId) {
      clearImmediate(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      fetch("http://www.moj.gov.kh/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `page=1&word=${value}&funcName=getWordList&lang=kh&ajax=1`,
      })
        .then((res) => {
          return res.text();
        })
        .then((data1) => {
          const data = JSON.parse(data1);
          if (data[0] > 10) {
            fetch("http://www.moj.gov.kh/lookup", {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
              },
              body: `page=2&word=${value}&funcName=getWordList&lang=kh&ajax=1`,
            })
              .then((res) => res.text())
              .then((data2) => {
                const dataParse2 = JSON.parse(data2);
                this.setState({
                  loading: false,
                  data: [...data[1], ...dataParse2[1]],
                  filterData: [...data[1], ...dataParse2[1]],
                });
              });
          } else {
            this.setState({
              filterData: data[1],
            });
          }
        });
    }, 250);
  };

  render() {
    const { data, loading, searchText, filterData } = this.state;

    if (loading) {
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
          placeholder="វាយបញ្ជូលពាក្យគន្លឹះ/Enter Keywords"
          onChangeText={this.handleSearchTextChange}
          autoCorrect={false}
        ></TextInput>
        {filterData.length > 0 && (
          <FlatList
            data={filterData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem
                navigation={this.props.navigation}
                word={item}
              ></ListItem>
            )}
          ></FlatList>
        )}
        {filterData.length === 0 && (
          <ScrollView style={styles.wordNotFound}>
            <Text>ទិន្នន័យមិនទាន់បញ្ជូល</Text>
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
