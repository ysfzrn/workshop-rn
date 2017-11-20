import React from "react";
import { View, Text } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import HomeScreen from "./screens/home";
import FavoritesScreen from "./screens/favorites";
import DetailScreen from "./screens/detail";

const RootTabs = TabNavigator({
  Home: {
    screen: HomeScreen
  },
  Favorites: {
    screen: FavoritesScreen
  }
});

const App = StackNavigator({
  MainScreen: {
    screen: RootTabs,
    navigationOptions: {
      headerTitle: "MARVEL",
      headerStyle: {
         backgroundColor:'red',
      },
      headerTitleStyle:{
          color:'white'
      }
    }
  },
  Detail: {
    screen: DetailScreen,
  }
});

export default App;
