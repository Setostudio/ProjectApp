import React, { Component } from "react";
import { View, Image, Animated, Easing } from "react-native";

import AppText from "../../components/basic/AppText";
import AppButton from "../../components/basic/AppButton";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";
import LoadingComponent from "../../components/others/LoadingComponent";
import screenNames from "../screenNames";
import appColor from "../../commonTheme";
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.opacityValue = new Animated.Value(0.2);
  }

  componentWillMount() {
    this.opacityValue.setValue(0.2);
    Animated.sequence([
      Animated.timing(this.opacityValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear
      }),
      Animated.timing(this.opacityValue, {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear
      })
    ]).start(() => {
      setTimeout(() => {
        this.props.navigation.navigate("Tab");
      }, 1000);
    });
  }
  render() {
    return (
      <AppView center flexSize={1}>
        <Animated.Image
          style={{
            width: 120,
            height: 120,
            opacity: this.opacityValue
          }}
          source={require("../../../assets/icon/Logo.png")}
        />
        <Animated.View
          style={{
            marginTop: 20,
            opacity: this.opacityValue
          }}
        >
          <AppText fontSize={18}>Welcome to Shopping App!</AppText>
        </Animated.View>
      </AppView>
    );
  }
}

export default SplashScreen;
