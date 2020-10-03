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

import ListItem from "../../components/ListItem";

export default class index extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: true,
         data: null,
      };
   }

   componentDidMount() {
      fetch("https://jsonplaceholder.typicode.com/posts")
         .then((res) => res.json())
         .then((data) => {
            this.setState({
               loading: false,
               data: data,
            });
         });
   }

   render() {
      const { data, loading } = this.state;
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
            ></TextInput>
            <FlatList
               data={data}
               renderItem={({ item }) => (
                  <ListItem
                     navigation={this.props.navigation}
                     word={item}
                  ></ListItem>
               )}
               keyExtractor={data.id}
            ></FlatList>
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
});
