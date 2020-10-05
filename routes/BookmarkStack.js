import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Header from "../components/Header";
import Bookmark from "../screens/Bookmark/index";
import Detail from "../screens/Home/Detail";

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
  Detail: {
    screen: Detail,
    navigationOptions: {
      title: "Detail",
      headerBackTitle: " ",
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
