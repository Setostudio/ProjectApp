import React, { Component } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Alert
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
import LoadingComponent from "../../components/others/LoadingComponent";
import appColor from "../../commonTheme";

import {
  viewProductAction,
  likeProductAction,
  addLikedProductAction,
  changeViewAction,
  deleteFavouriteAction,
  fetchAllProduct,
  fetchAllCategory,
  randomListAction
} from "../../actions";

import ApiService from "../../apis";
import { ScrollView } from "react-native-gesture-handler";
import screenNames from "../screenNames";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isModalVisible: false
    };
    cardWidth = new Animated.Value(getLayout.width - 100);
  }
  _toggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible
    }));
  };

  _keyExtractor = item => item._id;

  _renderView = () => {
    if (!this.props.isLoading) {
      return (
        <AppView center>
          <ScrollView horizontal={true}>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState(prevState => ({
                  refreshing: !prevState.refreshing
                }));
                this.props._randomListAction();
                this.setState(prevState => ({
                  refreshing: !prevState.refreshing
                }));
              }}
              horizontal={this.props.viewStyle == "Card" ? true : false}
              data={this.props.listProduct}
              extraData={this.props}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderContent}
            />
          </ScrollView>
        </AppView>
      );
    } else {
      return (
        <AppView
          center
          style={{
            width: getLayout.width,
            height: (getLayout.height * 9) / 11
          }}
        >
          <LoadingComponent />
        </AppView>
      );
    }
  };
  _renderContent = ({ item }) => {
    if (this.props.isCard) {
      return (
        <CardProduct
          data={item}
          onIconPress={() => {
            this.props._likeProductAction(item._id);
            if (!item.isLiked) {
              this.props._addLikedProductAction(item);
            } else {
              this.props._deleteFavouriteAction(item._id);
            }
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
  componentWillMount() {
    this.props._fetchAllCategory();
    this.props._fetchAllProduct();
  }
  render() {
    return (
      <AppView>
        <AppView>
          <AppHeader
            isCard={this.props.isCard}
            title="Welcome to ShoppingApp!"
            rightIcon
            onChangeView={() => {
              this.props._changeViewAction();
            }}
          />
        </AppView>
        <this._renderView />
      </AppView>
    );
  }
}

mapStateToProps = state => {
  let { listProduct, listSelectedProduct, isCard, isLoading } = state.product;
  return {
    listProduct,
    listSelectedProduct,
    isCard,
    isLoading
  };
};

mapDispatchToProps = dispatch => ({
  _viewProductAction: item => dispatch(viewProductAction(item)),
  _likeProductAction: id => dispatch(likeProductAction(id)),
  _addLikedProductAction: item => dispatch(addLikedProductAction(item)),
  _changeViewAction: () => dispatch(changeViewAction()),
  _deleteFavouriteAction: id => dispatch(deleteFavouriteAction(id)),
  _fetchAllCategory: () => dispatch(fetchAllCategory()),
  _fetchAllProduct: () => dispatch(fetchAllProduct()),
  _randomListAction: () => dispatch(randomListAction())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
