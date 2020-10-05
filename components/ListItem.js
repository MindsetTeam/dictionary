import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ListItem = ({ navigation, word }) => {
   return (
      <TouchableOpacity onPress={() => navigation.navigate("Detail", {
         searchWord: word
      })}>
         <View style={styles.item}>
            <Text style={styles.text}>{word}</Text>
         </View>
      </TouchableOpacity>
   );
};

export default ListItem;

const styles = StyleSheet.create({
   item: {
      paddingVertical: 11,
      paddingHorizontal: 11,
      backgroundColor: "#eee",
      marginBottom: 2
   },
   text:{
      fontSize: 16,
   }
});
