import React, { Component } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  Animated,
  Easing
} from "react-native";

import styles from "./styles";

import LoadingComponent from "../../components/others/LoadingComponent";
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
  fetchProductByCategory,
  toggleLoadingAction,
  likeProductAction,
  addLikedProductAction,
  viewProductAction
} from "../../actions";
import { ENDPOINT } from "../../apis/apiConfig";
class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      title: null
    };
  }

  _keyExtractor = (item, index) => item._id;

  _renderCategoryItem = ({ item, index }) => (
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
  _renderItem = ({ item, index }) => (
    <AppView
      onPress={() => {
        this.setState({ selected: true, title: item.name });
        this.props._fetchProductByCategory(item._id);
      }}
    >
      <ImageBackground
        source={{ uri: `${ENDPOINT}${item.image}` }}
        style={styles.imageBackground(index)}
      >
        <AppView style={styles.categoryView} />
        <AppView style={{ zindex: 3, position: "absolute" }}>
          <AppText fontSize={22} fullWhite>
            {item.name}
          </AppText>
        </AppView>
      </ImageBackground>
    </AppView>
  );
  _renderAllContent = () => {
    let { listCategory, listCategorySelected } = this.props;
    if (this.state.selected) {
      return (
        <FlatList
          data={listCategorySelected}
          extraData={this.props}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderCategoryItem}
        />
      );
    } else {
      return (
        <FlatList
          data={listCategory}
          extraData={this.props}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
  };
  render() {
    return (
      <AppView>
        <AppView>
          <AppHeader
            title={this.state.title ? this.state.title : "Category!"}
            backButton={this.state.selected}
            customBack={() => {
              this.setState({ selected: false, title: null });
            }}
          />
        </AppView>
        <AppView
          center
          style={{
            height: (getLayout.height * 10) / 11,
            width: getLayout.width
          }}
        >
          <this._renderAllContent />
        </AppView>
      </AppView>
    );
  }
}

mapStateToProps = state => {
  let {
    listCategory,
    listProduct,
    listCategorySelected,
    isLoading
  } = state.product;
  return {
    listCategory,
    listProduct,
    listCategorySelected,
    isLoading
  };
};

mapDispatchToProps = dispatch => ({
  _fetchProductByCategory: categoryId =>
    dispatch(fetchProductByCategory(categoryId)),
  _toggleLoadingAction: () => dispatch(toggleLoadingAction()),
  _viewProductAction: item => dispatch(viewProductAction(item)),
  _likeProductAction: id => dispatch(likeProductAction(id)),
  _addLikedProductAction: item => dispatch(addLikedProductAction(item))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryScreen);
