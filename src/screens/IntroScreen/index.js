import React, { Component } from "react";
import { View, ImageBackground, Image } from "react-native";

import Carousel from "react-native-snap-carousel";

import AppText from "../../components/basic/AppText";
import AppButton from "../../components/basic/AppButton";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";

import appColor from "../../commonTheme";
import getLayout from "../../helpers/getLayout";

const introList = [
  {
    name: "Explore the world of shopping in your hands",
    color: appColor.primaryColor
  },
  {
    name: "Explore the world of shopping in your hands",
    color: appColor.complementaryColor
  },
  {
    name: "Explore the world of shopping in your hands",
    color: appColor.cream
  }
];
class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem({ item, index }) {
    return (
      <ImageBackground
        source={require("../../../assets/intro/intro1.jpg")}
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: item.color,
          width: getLayout.width,
          height: getLayout.height
        }}
      >
        <AppView
          center
          style={{
            borderRadius: 20,
            width: getLayout.width / 2,
            backgroundColor: appColor.primaryColor,
            padding: 10,
            marginBottom: 60
          }}
        >
          <AppText fullWhite fontSize={16}>
            {item.name}
          </AppText>
        </AppView>
      </ImageBackground>
    );
  }
  render() {
    return (
      <AppView center>
        <Carousel
          data={introList}
          renderItem={this._renderItem}
          sliderWidth={getLayout.width}
          itemWidth={getLayout.width}
        />
      </AppView>
    );
  }
}

export default IntroScreen;
