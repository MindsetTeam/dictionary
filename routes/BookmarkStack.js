import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Header from "../components/Header";
import Bookmark from "../screens/Bookmark/index";

const screens = {
   Bookmark: {
      screen: Bookmark,
      navigationOptions: ({ navigation }) => {
         return {
            headerTitle: () => (
               <Header title="Bookmark" navigation={navigation}></Header>
            ),
         };
      },
   },
};

const BookmarkStack = createStackNavigator(screens, {
   defaultNavigationOptions: {
      headerStyle: {
         backgroundColor: "#6A0E00",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
   },
});

export default BookmarkStack;
