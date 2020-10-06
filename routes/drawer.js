import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import React from "react";

import HomeStack from "./HomeStack";
import AboutStack from "./AboutStack";
import BookmarkStack from "./BookmarkStack";
import HistoryStack from "./HistoryStack";
import Sidebar from "../components/Sidebar";

import {
  Feather,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

const drawerOptions = {
  Home: {
    screen: HomeStack,
    navigationOptions: {
      title: "Home",
      drawerIcon: ({ tintColor }) => (
        <AntDesign name="home" size={18} color={tintColor} />
      ),
    },
  },
  About: {
    screen: AboutStack,
    navigationOptions: {
      title: "About",
      drawerIcon: ({ tintColor }) => (
        <Feather name="info" size={18} color={tintColor}></Feather>
      ),
    },
  },
  Bookmark: {
    screen: BookmarkStack,
    navigationOptions: {
      title: "Bookmark",
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="bookmark-o" size={18} color={tintColor} />
      ),
    },
  },
  History: {
    screen: HistoryStack,
    navigationOptions: {
      title: "History",
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="history" size={18} color={tintColor} />
      ),
    },
  },
};

const drawer = createDrawerNavigator(drawerOptions, {
  contentComponent: (props) => {
    return <Sidebar {...props}></Sidebar>;
  },
  // hideStatusBar: true,
  contentOptions: {
    activeBackgroundColor: "#6A0E00",
    activeTintColor: "#fff",
  },
});

export default createAppContainer(drawer);
