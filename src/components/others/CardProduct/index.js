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
    let {
      productImg,
      productName,
      productPrice,
      productRating,
      isLiked
    } = this.props.data;
    return (
      <TouchableOpacity onPress={this.props.onPressItem}>
        <Card style={{ width: getLayout.width - 100, marginTop: 20 }}>
          <AppView onPress={this.props.onIconPress}>
            <Icon
              name="ios-heart"
              size={35}
              color={isLiked ? appColor.primaryColor : appColor.cardGrey}
            />
          </AppView>
          <AppView center>
            <Image
              source={{ uri: productImg }}
              style={{ width: getLayout.width - 40, height: 200 }}
              resizeMode="contain"
            />
          </AppView>

          <AppView center style={{ marginTop: 20 }}>
            <AppText>{productName}</AppText>
            <AppText>{productPrice}$</AppText>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={productRating}
              starSize={20}
              fullStarColor={appColor.primaryColor}
              halfStarColor={appColor.primaryColor}
            />
          </AppView>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default CardProduct;
