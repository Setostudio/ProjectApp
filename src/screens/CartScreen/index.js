import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, Image, Share } from "react-native";

import { ENDPOINT } from "../../apis/apiConfig";
import NotificationBadge from "../../components/others/NotificationBadge";
import { connect } from "react-redux";
import getLayout from "../../helpers/getLayout";

import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { toggleQuantity, deleteItemAction } from "../../actions";
import { ScrollView } from "react-native-gesture-handler";

import ModalConfirm from "../../components/others/ModalConfirm";

import AppText from "../../components/basic/AppText";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";
import appColor from "../../commonTheme";
import screenNames from "../screenNames";
import styles from "./styles";
class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      currentId: ""
    };
  }

  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => <NotificationBadge color={tintColor} />,
    activeTintColor: appColor.primaryColor,
    inactiveTintColor: appColor.darkGrey
  });

  _onCheckout = () => {};
  _keyExtractor = item => item._id;

  _renderItem = ({ item }) => {
    let { imageSub, name, price, quantity, _id } = item;
    return (
      <AppView style={{ marginBottom: 10, borderBottomWidth: 0.5 }}>
        <AppView row style={{ marginBottom: 10 }}>
          <AppView flexSize={2}>
            <Image
              source={{ uri: `${ENDPOINT}${imageSub}` }}
              style={{
                width: getLayout.width / 4,
                height: 100,
                borderRadius: 20
              }}
              resizeMode="contain"
            />
          </AppView>
          <AppView flexSize={5}>
            <AppView
              flexSize={2}
              style={{ justifyContent: "center", marginLeft: 10 }}
            >
              <AppText fontSize={16}>{name}</AppText>
              <AppText bold fontSize={17}>
                $ {price}
              </AppText>
            </AppView>
            <AppView
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end",
                padding: 10
              }}
              onPress={() => {
                this.setState({ currentId: _id, isModalVisible: true });
              }}
            >
              <Icon name="trash" size={20} color={appColor.primaryColor} />
            </AppView>
          </AppView>
          <AppView
            flexSize={1}
            style={{
              alignItems: "flex-end",
              justifyContent: "center",
              marginRight: 10
            }}
          >
            <AppView
              center
              onPress={() => {
                this.props._toggleQuantity(_id, true);
              }}
            >
              <Ionicons
                name="ios-arrow-up"
                size={25}
                color={appColor.primaryColor}
              />
            </AppView>
            <AppView>
              <AppText fontSize={25}>{quantity}</AppText>
            </AppView>
            <AppView
              center
              onPress={() => {
                this.props._toggleQuantity(_id, false);
              }}
            >
              <Ionicons
                name="ios-arrow-down"
                size={25}
                color={appColor.primaryColor}
              />
            </AppView>
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
          <AppView
            row
            style={{ width: getLayout.width, height: 20, marginTop: 10 }}
          >
            <AppView
              style={{ flex: 1, marginLeft: 10, justifyContent: "center" }}
            >
              <AppText bold fontSize={18}>
                Total Price:
              </AppText>
            </AppView>
            <AppView
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
                marginRight: 15
              }}
            >
              <AppText fontSize={18} style={{ color: appColor.primaryColor }}>
                $ {this.props.totalPrice}
              </AppText>
            </AppView>
          </AppView>
          <AppView style={{ marginTop: 15 }}>
            <FlatList
              data={this.props.listSelectedProduct}
              extraData={this.props}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </AppView>
        </AppView>
      );
    }
  };
  _toggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible
    }));
  };
  render() {
    return (
      <AppView flexSize={1}>
        <ModalConfirm
          isVisible={this.state.isModalVisible}
          onBackButtonPress={this._toggleModal}
          onBackdropPress={this._toggleModal}
          onExit={this._toggleModal}
          onConfirm={() => {
            this.props._deleteItemAction(this.state.currentId);
            this._toggleModal();
          }}
        />
        <AppHeader />
        <ScrollView>
          <this._renderEmpty />
        </ScrollView>
        <AppView row style={styles.bottomButton}>
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
  let { listSelectedProduct, totalPrice } = state.product;
  return {
    listSelectedProduct,
    totalPrice
  };
};
mapDispatchToProps = dispatch => ({
  _toggleQuantity: (id, isPlus) => dispatch(toggleQuantity(id, isPlus)),
  _deleteItemAction: id => dispatch(deleteItemAction(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen);
