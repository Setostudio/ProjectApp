import React, { Component } from "react";
import { FlatList } from "react-native";
import SwipeUpDown from "react-native-swipe-up-down";
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

import { deleteFavouriteAction } from "../../actions";
class ListLikedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _keyExtractor = (item, index) => item.productId;

  _renderItem = ({ item }) => (
    <ListProduct
      data={item}
      favourite
      onIconPress={() => {
        this.props._deleteFavouriteAction(item.productId);
      }}
    />
  );

  _renderEmpty = () => {
    if (this.props.listLikedProduct.length < 1) {
      return (
        <AppView
          style={{
            width: getLayout.width,
            height: (getLayout.height * 10) / 11
          }}
          center
        >
          <AppText style={{ color: appColor.analogousColor, fontSize: 18 }}>
            You don't have any favourite yet!
          </AppText>
        </AppView>
      );
    } else {
      return (
        <AppView style={{ marginTop: 20 }}>
          <FlatList
            data={this.props.listLikedProduct}
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
      <AppView>
        <AppView>
          <AppHeader backButton title="Your favorite" />
        </AppView>
        <this._renderEmpty />
      </AppView>
    );
  }
}
mapStateToProps = state => {
  return {
    listLikedProduct: state.listLikedProduct
  };
};
mapDispatchToProps = dispatch => ({
  _deleteFavouriteAction: id => dispatch(deleteFavouriteAction(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLikedScreen);
