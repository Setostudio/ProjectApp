import React, { Component } from "react";
import {} from "react-native";
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
    let { data } = this.props;
    return (
      <AppView row style={{ width: getLayout.width, marginBottom: 15 }}>
        <AppView flexSize={1} onPress={this.props.onPressItem}>
          <Thumbnail source={{ uri: data.productImg }} large />
        </AppView>
        <AppView flexSize={4}>
          <AppText>{data.productName}</AppText>
          <AppText>{data.productPrice} $</AppText>
          <AppView row style={{ alignItems: "center" }}>
            <StarRating
              containerStyle={{ width: 100 }}
              disabled={true}
              maxStars={5}
              rating={data.productRating}
              starSize={15}
              fullStarColor={appColor.primaryColor}
              halfStarColor={appColor.primaryColor}
            />
            <AppView style={{ marginLeft: 10 }}>
              <AppText fontSize={15}>{data.productRating} / 5</AppText>
            </AppView>
          </AppView>
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
              color={data.isLiked ? appColor.primaryColor : appColor.cardGrey}
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
