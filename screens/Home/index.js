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
      fetch("https://jsonplaceholder.typicode.com/posts")
         .then((res) => res.json())
         .then((data) => {
            this.setState({
               loading: false,
               data: data,
               filterData: data,
            });
         });
   }

   handleSearchTextChange = (value) => {
      const { data, filterData } = this.state;
      if (value != "") {
         this.setState({
            filterData: data.filter((d) =>
               d.title.split(" ")[0].startsWith(value.toLowerCase())
            ),
         });
         return;
      }
      this.setState({
         filterData: data,
      });
   };

   render() {
      const { data, loading, searchText, filterData } = this.state;

      if (loading) {
         return (
            <View style={styles.loadingContainer}>
               <ActivityIndicator
                  color="#6A0E00"
                  size="large"
               ></ActivityIndicator>
            </View>
         );
      }
      return (
         <View style={styles.container}>
            <TextInput
               style={styles.textSearch}
               placeholder="Search Text ..."
               onChangeText={this.handleSearchTextChange}
               autoCorrect={false}
            ></TextInput>
            {filterData.length > 0 && (
               <FlatList
                  data={filterData}
                  renderItem={({ item }) => (
                     <ListItem
                        navigation={this.props.navigation}
                        word={item}
                     ></ListItem>
                  )}
                  keyExtractor={filterData.id}
               ></FlatList>
            )}
            {filterData.length === 0 && (
               <ScrollView style={styles.wordNotFound}>
                  <Text>word not found</Text>
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
      fontSize: 15,
   },
   wordNotFound: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "#eee",
   },
});
