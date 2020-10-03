import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ListItem = ({ navigation, word }) => {
   return (
      <TouchableOpacity onPress={() => navigation.navigate("Detail", word)}>
         <View style={styles.item}>
            <Text>{word.title.split(" ")[0]}</Text>
         </View>
      </TouchableOpacity>
   );
};

export default ListItem;

const styles = StyleSheet.create({
   item: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "#eee",
   },
});
