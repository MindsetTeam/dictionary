import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Home from "../screens/Home/index";
import Detail from "../screens/Home/Detail";
import Header from "../components/Header";

const screens = {
   Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
         return {
            headerTitle: () => (
               <Header title="Home" navigation={navigation}></Header>
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

const HomeStack = createStackNavigator(screens, {
   defaultNavigationOptions: {
      headerStyle: {
         backgroundColor: "#6A0E00",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
   },
});

export default HomeStack;
