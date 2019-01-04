import React, { Component } from "react";
import { View } from "react-native";

import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import AppView from "../AppView";
import getLayout from "../../../helpers/getLayout";
import appColor from "../../../commonTheme";
import AppText from "../AppText";
import screenNames from "../../../screens/screenNames";
import StarRating from "react-native-star-rating";
class AppHeader extends Component {
  render() {
    return (
      <AppView
        center
        row
        style={{
          width: getLayout.width,
          height: getLayout.height / 11,
          backgroundColor: appColor.primaryColor
        }}
      >
        <AppView flexSize={1} style={{ marginLeft: 10 }}>
          {this.props.backButton && (
            <AppView
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={25} color={appColor.pureWhite} />
            </AppView>
          )}
        </AppView>
        <AppView flexSize={4}>
          <AppText bold fontSize={18} fullWhite>
            {this.props.title}
          </AppText>
        </AppView>
        <AppView flexSize={1} row>
          {this.props.rightIcon && (
            <AppView row style={{ alignItems: "flex-end" }}>
              <AppView
                style={{ marginRight: 10 }}
                onPress={() => {
                  this.props.navigation.navigate(screenNames.Liked);
                }}
              >
                <Icon name="heart" size={25} color={appColor.pureWhite} />
              </AppView>
              <AppView
                style={{ marginRight: 5 }}
                onPress={this.props.onChangeView}
              >
                <Icon
                  name={this.props.isCard ? "columns" : "chalkboard"}
                  size={25}
                  color={appColor.pureWhite}
                />
              </AppView>
            </AppView>
          )}
        </AppView>
      </AppView>
    );
  }
}

export default withNavigation(AppHeader);
