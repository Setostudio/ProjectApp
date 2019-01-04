import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";

import appColor from "../../../commonTheme";
class AppButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: this.props.primary
            ? appColor.primaryColor
            : appColor.complementaryColor,
          alignItems: "center",
          justifyContent: "center",
          ...this.props.style
        }}
        onPress={this.props.onPress}
        {...this.props}
      >
        <View style={{ padding: 10 }}>{this.props.children}</View>
      </TouchableOpacity>
    );
  }
}

export default AppButton;
