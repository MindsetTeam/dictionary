import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Header from "../components/Header";
import About from "../screens/About/index";

const screens = {
   About: {
      screen: About,
      navigationOptions: ({ navigation }) => {
         return {
            headerTitle: () => (
               <Header title="About" navigation={navigation}></Header>
            ),
         };
      },
   },
};

const AboutStack = createStackNavigator(screens, {
   defaultNavigationOptions: {
      headerStyle: {
         backgroundColor: "#6A0E00",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
   },
});

export default AboutStack;
