import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, Image } from "react-native";

import { connect } from "react-redux";
import getLayout from "../../helpers/getLayout";

import AppText from "../../components/basic/AppText";
import AppButton from "../../components/basic/AppButton";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";

import StarRating from "react-native-star-rating";
import appColor from "../../commonTheme";

import screenNames from "../screenNames";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { toggleQuantityAction, deleteItemAction } from "../../actions";
import { ScrollView } from "react-native-gesture-handler";

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onCheckout = () => {};
  _keyExtractor = item => item.productId;

  _renderItem = ({ item }) => {
    return (
      <AppView row style={{ marginBottom: 10, borderBottomWidth: 0.5 }}>
        <AppView flexSize={1}>
          <Image
            source={{ uri: item.productImg }}
            style={{ width: getLayout.width / 5 - 10, height: 100 }}
            resizeMode="contain"
          />
        </AppView>

        <AppView flexSize={3}>
          <AppView flexSize={2} style={{ justifyContent: "center" }}>
            <AppText fontSize={16}>{item.productName}</AppText>
            <AppText bold fontSize={17}>
              $ {item.productPrice} * {item.productQuantity}
            </AppText>
          </AppView>
          <AppView
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 10
            }}
            onPress={() => {
              this.props._deleteItemAction(item.productId);
            }}
          >
            <Icon name="trash" size={20} color={appColor.primaryColor} />
          </AppView>
        </AppView>
        <AppView center flexSize={1}>
          <AppView
            center
            onPress={() => {
              this.props._toggleQuantityAction(item.productId, true);
            }}
          >
            <AppText>Increase</AppText>
          </AppView>
          <AppView>
            <AppText>{item.productQuantity}</AppText>
          </AppView>
          <AppView
            center
            onPress={() => {
              this.props._toggleQuantityAction(item.productId, false);
            }}
          >
            <AppText>Decrease</AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  };
  _renderEmpty = () => {
    if (this.props.listSelectedProduct.length < 1) {
      return (
        <AppView
          style={{
            width: getLayout.width,
            height: (getLayout.height * 9) / 11
          }}
          center
        >
          <AppText style={{ color: appColor.analogousColor, fontSize: 18 }}>
            You don't have anything in your cart yet!
          </AppText>
        </AppView>
      );
    } else {
      return (
        <AppView>
          <AppView row style={{ width: getLayout.width, height: 20 }}>
            <AppView style={{ flex: 1 }}>
              <AppText fontSize={18}>Total Price:</AppText>
            </AppView>
            <AppView
              style={{
                flex: 1,
                alignItems: "flex-end",
                marginRight: 15
              }}
            >
              <AppText fontSize={18}>$ {this.props.totalPrice}</AppText>
            </AppView>
          </AppView>
          <FlatList
            data={this.props.listSelectedProduct}
            extraData={this.props}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </AppView>
      );
    }
  };
  render() {
    return (
      <AppView flexSize={1}>
        <AppHeader />
        <ScrollView>
          <this._renderEmpty />
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
            flexSize={1}
            center
            style={{ backgroundColor: appColor.pureWhite }}
            onPress={() => {
              this.props.navigation.navigate(screenNames.HomeScreen);
            }}
          >
            <AppText bold>BACK TO SHOPPING</AppText>
          </AppView>
          <AppView
            flexSize={1}
            center
            style={{ backgroundColor: appColor.primaryColor }}
          >
            <AppText fullWhite bold>
              NEXT STEP
            </AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}
mapStateToProps = state => {
  return {
    listSelectedProduct: state.listSelectedProduct,
    totalPrice: state.totalPrice
  };
};
mapDispatchToProps = dispatch => ({
  _toggleQuantityAction: (id, isPlus) =>
    dispatch(toggleQuantityAction(id, isPlus)),
  _deleteItemAction: id => dispatch(deleteItemAction(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen);
