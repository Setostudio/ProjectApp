import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Icon from "react-native-vector-icons/FontAwesome5";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";

import appColor from "../commonTheme";

import screenNames from "../screens/screenNames";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import ViewProductScreen from "../screens/ViewProductScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ListLikedScreen from "../screens/ListLikedScreen";
const TabStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Category: CategoryScreen,
    Search: SearchScreen,
    Cart: CartScreen,
    Account: AccountScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === screenNames.HomeScreen) {
          iconName = `heartbeat`;
        } else if (routeName == screenNames.AccountScreen) {
          iconName = "user-md";
        } else if (routeName == screenNames.CartScreen) {
          iconName = "shopping-cart";
        } else if (routeName == screenNames.SearchScreen) {
          iconName = "search";
        } else if (routeName == screenNames.CategoryScreen) {
          iconName = "th-large";
        }

        return (
          <Icon name={iconName} size={focused ? 25 : 20} color={tintColor} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: appColor.primaryColor,
      inactiveTintColor: appColor.darkGrey,
      style: {
        backgroundColor: "#fafafa"
      }
    }
  }
);

const OutterStack = createStackNavigator(
  {
    Tab: {
      screen: TabStack
    },
    ViewProduct: {
      screen: ViewProductScreen
    },
    Cart: {
      screen: CartScreen
    },
    Liked: {
      screen: ListLikedScreen
    }
  },
  {
    headerMode: "none"
  }
);
export default createAppContainer(OutterStack);
