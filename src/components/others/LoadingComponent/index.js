import React, { Component } from "react";
import { View, Animated, Easing } from "react-native";

import getLayout from "../../../helpers/getLayout";
import AppText from "../../basic/AppText";
import AppView from "../../basic/AppView";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import appColor from "../../../commonTheme";

class LoadingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }
  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start(() => this.spin());
  };
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <AppView center flexSize={1}>
        <Animated.Image
          style={{
            width: 80,
            height: 80,
            transform: [{ rotate: spin }]
          }}
          source={require("../../../../assets/icon/Logo.png")}
        />
      </AppView>
    );
  }
}

export default LoadingComponent;
