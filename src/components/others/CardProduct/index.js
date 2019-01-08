import React, { Component } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from "react-native";

import { ENDPOINT } from "../../../apis/apiConfig";
import { connect } from "react-redux";
import getLayout from "../../../helpers/getLayout";

import AppText from "../../basic/AppText";
import AppView from "../../basic/AppView";

import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import appColor from "../../../commonTheme";
import { Card } from "native-base";

class CardProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { imageSub, name, price, isLiked } = this.props.data;
    return (
      <AppView center>
        <AppView
          onPress={this.props.onPressItem}
          style={{ width: getLayout.width - 40 }}
        >
          <AppView onPress={this.props.onIconPress}>
            <Icon
              name="ios-heart"
              size={35}
              color={isLiked ? appColor.primaryColor : appColor.cardGrey}
            />
          </AppView>
          <AppView center>
            <Image
              source={{ uri: `${ENDPOINT}${imageSub}` }}
              style={{ width: getLayout.width - 40, height: 250 }}
              resizeMode="contain"
            />
          </AppView>

          <AppView center style={{ marginTop: 20 }}>
            <AppText bold fontSize={18}>
              {name}
            </AppText>
            <AppText>${price}</AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}

export default CardProduct;
