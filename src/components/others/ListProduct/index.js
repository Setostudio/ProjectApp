import React, { Component } from "react";
import { Image } from "react-native";

import { ENDPOINT } from "../../../apis/apiConfig";
import { Thumbnail } from "native-base";
import { connect } from "react-redux";
import getLayout from "../../../helpers/getLayout";
import AppText from "../../basic/AppText";
import AppView from "../../basic/AppView";
import StarRating from "react-native-star-rating";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import appColor from "../../../commonTheme";
class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      image,
      imageSub,
      name,
      price,
      _id,
      description,
      isLiked
    } = this.props.data;
    return (
      <AppView row style={{ width: getLayout.width, marginBottom: 15 }}>
        <AppView flexSize={1} onPress={this.props.onPressItem}>
          <Image
            source={{ uri: `${ENDPOINT}${imageSub}` }}
            style={{
              width: getLayout.width / 4 - 10,
              height: 100,
              borderRadius: 20
            }}
            resizeMode="contain"
          />
        </AppView>
        <AppView flexSize={2} style={{ marginLeft: 10 }}>
          <AppText bold fontSize={18}>
            {name}
          </AppText>
          <AppText>{price} $</AppText>
        </AppView>
        <AppView
          onPress={this.props.onIconPress}
          flexSize={1}
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            marginRight: 15
          }}
        >
          {!this.props.favourite && (
            <Ionicons
              name="ios-heart"
              size={35}
              color={isLiked ? appColor.primaryColor : appColor.cardGrey}
            />
          )}
          {this.props.favourite && (
            <Icon name="trash" size={30} color={appColor.primaryColor} />
          )}
        </AppView>
      </AppView>
    );
  }
}

export default ListProduct;
