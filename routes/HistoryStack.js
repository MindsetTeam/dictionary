import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import History from "../screens/History/index";
import Detail from "../screens/Detail";
import Header from "../components/Header";

const screens = {
  History: {
    screen: History,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="History" navigation={navigation}></Header>
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

const HistoryStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#6A0E00",
    },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
  },
});

export default HistoryStack;
