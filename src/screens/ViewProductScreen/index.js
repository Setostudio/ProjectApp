import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import CardProduct from "../../components/others/CardProduct";

import { connect } from "react-redux";
import getLayout from "../../helpers/getLayout";

import Ionicons from "react-native-vector-icons/Ionicons";

import AppText from "../../components/basic/AppText";
import AppButton from "../../components/basic/AppButton";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";

import StarRating from "react-native-star-rating";
import appColor from "../../commonTheme";

import {
  addProductIdAction,
  likeProductAction,
  addLikedProductAction,
  likeSelectedProduct
} from "../../actions";
import screenNames from "../screenNames";
import { ScrollView } from "react-native-gesture-handler";
class ViewProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onSelectItem = () => {
    let { selectedProduct, listSelectedProduct } = this.props;
    this.props._addProductIdAction(selectedProduct, listSelectedProduct);
    this.props.navigation.navigate(screenNames.HomeScreen);
  };

  render() {
    let {
      productName,
      productImg,
      productPrice,
      productRating,
      productId,
      productQuantity,
      isLiked
    } = this.props.selectedProduct;
    return (
      <AppView flexSize={1}>
        <AppHeader backButton title={productName} />
        <AppView flexSize={1}>
          <ScrollView>
            <AppView center>
              <AppView>
                <Image
                  source={{ uri: productImg }}
                  style={{ width: getLayout.width - 50, height: 200 }}
                  resizeMode="contain"
                />
              </AppView>
              <AppView>
                <AppText>{productName}</AppText>
                <AppText>{productPrice} $</AppText>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={productRating}
                  starSize={20}
                  fullStarColor={appColor.primaryColor}
                  halfStarColor={appColor.primaryColor}
                />
              </AppView>
            </AppView>
          </ScrollView>
          <AppView
            row
            style={{
              height: getLayout.height / 15,
              width: getLayout.width,
              justifyContent: "flex-end"
            }}
          >
            <AppView
              onPress={() => {
                this.props._addProductIdAction(this.props.selectedProduct);
                this.props.navigation.navigate(screenNames.CartScreen);
              }}
              flexSize={1}
              center
              style={{ backgroundColor: appColor.primaryColor }}
            >
              <AppText fullWhite bold>
                BUY NOW
              </AppText>
            </AppView>
            <AppView flexSize={1} row>
              <AppView flexSize={1} center>
                <Ionicons name="ios-share" size={30} color={appColor.primary} />
              </AppView>
              <AppView
                flexSize={1}
                center
                onPress={() => {
                  this.props._likeProductAction(productId);
                  this.props._addLikedProductAction(this.props.selectedProduct);
                  this.props._likeSelectedProduct(this.props.selectedProduct);
                }}
              >
                <Ionicons
                  name="ios-heart"
                  size={30}
                  color={isLiked ? appColor.primaryColor : appColor.cardGrey}
                />
              </AppView>
              <AppView flexSize={1} center>
                <AppView style={{ zIndex: 0 }}>
                  <Ionicons
                    name="ios-cart"
                    size={30}
                    color={appColor.primary}
                  />
                </AppView>
                <AppView
                  center
                  style={{
                    backgroundColor: appColor.primaryColor,
                    width: 20,
                    height: 20,
                    right: 10,
                    borderRadius: 10,
                    top: 5,
                    position: "absolute",
                    zIndex: 1
                  }}
                >
                  <AppText fillwhite>{productQuantity}</AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}

mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct,
    listSelectedProduct: state.listSelectedProduct
  };
};
mapDispatchToProps = dispatch => ({
  _addProductIdAction: item => dispatch(addProductIdAction(item)),
  _likeProductAction: id => dispatch(likeProductAction(id)),
  _addLikedProductAction: item => dispatch(addLikedProductAction(item)),
  _likeSelectedProduct: item => dispatch(likeSelectedProduct(item))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProductScreen);
