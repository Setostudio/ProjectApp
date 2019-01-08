import React, { Component } from "react";
import { FlatList } from "react-native";

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

import ModalConfirm from "../../components/others/ModalConfirm";
import { deleteFavouriteAction, likeProductAction } from "../../actions";
class ListLikedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false, currentId: "" };
  }
  _keyExtractor = item => item.productId;

  _renderItem = ({ item }) => (
    <ListProduct
      data={item}
      favourite
      onIconPress={() => {
        this.setState({ isModalVisible: true, currentId: item._id });
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
  _toggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible
    }));
  };
  render() {
    return (
      <AppView>
        <ModalConfirm
          isVisible={this.state.isModalVisible}
          onBackButtonPress={this._toggleModal}
          onBackdropPress={this._toggleModal}
          onExit={this._toggleModal}
          onConfirm={() => {
            let { _likeProductAction, _deleteFavouriteAction } = this.props;
            _deleteFavouriteAction(this.state.currentId);
            _likeProductAction(this.state.currentId);
            this._toggleModal();
          }}
        />
        <AppView>
          <AppHeader backButton title="Your favorite" />
        </AppView>
        <this._renderEmpty />
      </AppView>
    );
  }
}
mapStateToProps = state => {
  let { listLikedProduct } = state.product;
  return {
    listLikedProduct: listLikedProduct
  };
};
mapDispatchToProps = dispatch => ({
  _deleteFavouriteAction: id => dispatch(deleteFavouriteAction(id)),
  _likeProductAction: id => dispatch(likeProductAction(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLikedScreen);
