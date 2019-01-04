import React, { Component } from "react";
import { Text, View } from "react-native";

class AppText extends Component {
  render() {
    return (
      <Text
        style={{
          fontFamily: this.props.bold ? "OpenSans-Bold" : "OpenSans-Regular",
          fontSize: this.props.fontSize,
          color: this.props.fullWhite ? "#FFF" : "black",
          ...this.props.style
        }}
        {...this.props}
      >
        {this.props.children}
      </Text>
    );
  }
}

export default AppText;
