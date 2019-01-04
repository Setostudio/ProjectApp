import React, { Component } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Text
} from "react-native";

import { NavigationProp } from "react-navigation";
import { Thumbnail, List } from "native-base";
import { connect } from "react-redux";
import getLayout from "../../helpers/getLayout";

import AppText from "../../components/basic/AppText";
import AppButton from "../../components/basic/AppButton";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";
import data from "../../data";

import CardProduct from "../../components/others/CardProduct";
import ListProduct from "../../components/others/ListProduct";

import appColor from "../../commonTheme";

import {
  viewProductAction,
  likeProductAction,
  addLikedProductAction,
  changeViewAction
} from "../../actions";
import { ScrollView } from "react-native-gesture-handler";
import screenNames from "../screenNames";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
    cardWidth = new Animated.Value(getLayout.width - 100);
  }
  _toggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible
    }));
  };

  _keyExtractor = item => item.productId;

  _renderContent = ({ item }) => {
    if (this.props.isCard) {
      return (
        <CardProduct
          data={item}
          onIconPress={() => {
            this.props._likeProductAction(item.productId);
            this.props._addLikedProductAction(item);
          }}
          onPressItem={() => {
            this.props._viewProductAction(item);
            this.props.navigation.navigate(screenNames.ViewProductScreen);
          }}
        />
      );
    } else {
      return (
        <ListProduct
          data={item}
          onIconPress={() => {
            this.props._likeProductAction(item.productId);
            this.props._addLikedProductAction(item);
          }}
          onPressItem={() => {
            this.props._viewProductAction(item);
            this.props.navigation.navigate(screenNames.ViewProductScreen);
          }}
        />
      );
    }
  };
  componentWillMount() {}
  render() {
    return (
      <AppView center>
        <AppHeader
          isCard={this.props.isCard}
          title="Welcome to ShoppingApp!"
          rightIcon
          onChangeView={() => {
            this.props._changeViewAction();
          }}
        />
        <ScrollView horizontal={true}>
          <FlatList
            horizontal={this.props.viewStyle == "Card" ? true : false}
            data={this.props.listProduct}
            extraData={this.props}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderContent}
          />
        </ScrollView>
      </AppView>
    );
  }
}

mapStateToProps = state => {
  return {
    listProduct: state.listProduct,
    listSelectedProduct: state.listSelectedProduct,
    isCard: state.isCard
  };
};
mapDispatchToProps = dispatch => ({
  _viewProductAction: item => dispatch(viewProductAction(item)),
  _likeProductAction: id => dispatch(likeProductAction(id)),
  _addLikedProductAction: item => dispatch(addLikedProductAction(item)),
  _changeViewAction: () => dispatch(changeViewAction())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
