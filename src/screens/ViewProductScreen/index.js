import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Share
} from "react-native";
import CardProduct from "../../components/others/CardProduct";

import { ENDPOINT } from "../../apis/apiConfig";
import { connect } from "react-redux";
import getLayout from "../../helpers/getLayout";

import Ionicons from "react-native-vector-icons/Ionicons";

import AppText from "../../components/basic/AppText";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";
import styles from "./styles";
import appColor from "../../commonTheme";

import {
  addProductIdAction,
  likeProductAction,
  addLikedProductAction,
  likeSelectedProduct,
  getRelatedAction,
  viewProductAction
} from "../../actions";
import screenNames from "../screenNames";
import { ScrollView } from "react-native-gesture-handler";

class ViewProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.imageHeight = new Animated.Value(200);
    this.props._getRelatedAction();
  }
  _onSelectItem = () => {
    let { selectedProduct, listSelectedProduct } = this.props;
    this.props._addProductIdAction(selectedProduct, listSelectedProduct);
    this.props.navigation.navigate(screenNames.HomeScreen);
  };

  _scrollToTop = () => {
    this.scroller.scrollTo({ x: 10, y: 10 });
  };

  render() {
    let {
      image,
      imageSub,
      name,
      price,
      _id,
      description,
      isLiked
    } = this.props.selectedProduct;
    return (
      <AppView flexSize={1}>
        <AppHeader backButton title={name} />
        <AppView flexSize={1}>
          <ScrollView
            ref={scroller => {
              this.scroller = scroller;
            }}
          >
            <AppView center>
              <AppView style={{ marginTop: 10 }}>
                <Animated.Image
                  source={{ uri: `${ENDPOINT}${imageSub}` }}
                  style={{
                    width: getLayout.width - 50,
                    height: this.imageHeight,
                    borderRadius: 10
                  }}
                  resizeMode="contain"
                />
              </AppView>
              <AppView style={{ marginTop: 10, marginBottom: 10 }}>
                <AppText bold fontSize={18}>
                  Product Photos:
                </AppText>
              </AppView>
              <AppView row style={{ marginTop: 15 }}>
                {image.map(child => {
                  return (
                    <AppView style={{ marginRight: 10 }}>
                      <Image
                        source={{ uri: `${ENDPOINT}${child}` }}
                        style={styles.imageView}
                      />
                    </AppView>
                  );
                })}
              </AppView>
              <AppView
                center
                style={{
                  marginTop: 10
                }}
              >
                <AppText bold fontSize={18}>
                  {name}
                </AppText>
                <AppView style={{ marginTop: 10 }}>
                  <AppText fontSize={16}>${price}</AppText>
                </AppView>
              </AppView>
              <AppView style={styles.descriptionView}>
                <AppText bold fontSize={18}>
                  Description:
                </AppText>
                <AppView style={{ marginTop: 10 }}>
                  <AppText fontSize={16}>{description}</AppText>
                </AppView>
              </AppView>
              <AppView style={{ marginTop: 10 }}>
                <AppView style={{ width: getLayout.width, marginBottom: 15 }}>
                  <AppView style={{ marginLeft: 10 }}>
                    <AppText bold fontSize={18}>
                      Related Products:
                    </AppText>
                  </AppView>
                  <ScrollView horizontal={true} style={{ marginTop: 20 }}>
                    {this.props.listRelatedProduct.map(child => {
                      return (
                        <AppView
                          center
                          style={{ width: getLayout.width / 3 }}
                          onPress={() => {
                            this.props._viewProductAction(child);
                            this._scrollToTop();
                          }}
                        >
                          <Image
                            source={{ uri: `${ENDPOINT}${child.imageSub}` }}
                            style={styles.imageView}
                          />
                          <AppView center>
                            <AppText bold fontSize={16}>
                              {child.name}
                            </AppText>
                            <AppText>${child.price}</AppText>
                          </AppView>
                        </AppView>
                      );
                    })}
                  </ScrollView>
                </AppView>
              </AppView>
            </AppView>
          </ScrollView>
          <AppView row style={styles.bottomButton}>
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
              <AppView
                flexSize={1}
                center
                onPress={() => {
                  Share.share(
                    {
                      message: name,
                      url: "",
                      title: name
                    },
                    {
                      dialogTitle: "Share Your Product!"
                    }
                  );
                }}
              >
                <Ionicons name="ios-share" size={30} color={appColor.primary} />
              </AppView>
              <AppView
                flexSize={1}
                center
                onPress={() => {
                  this.props._likeProductAction(_id);
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
                />
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}

mapStateToProps = state => {
  let {
    selectedProduct,
    listSelectedProduct,
    listRelatedProduct
  } = state.product;
  return {
    selectedProduct,
    listSelectedProduct,
    listRelatedProduct
  };
};
mapDispatchToProps = dispatch => ({
  _addProductIdAction: item => dispatch(addProductIdAction(item)),
  _likeProductAction: id => dispatch(likeProductAction(id)),
  _addLikedProductAction: item => dispatch(addLikedProductAction(item)),
  _likeSelectedProduct: item => dispatch(likeSelectedProduct(item)),
  _getRelatedAction: () => dispatch(getRelatedAction()),
  _viewProductAction: item => dispatch(viewProductAction(item))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProductScreen);
