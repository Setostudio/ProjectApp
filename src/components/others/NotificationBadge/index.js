import React from "react";
import { connect } from "react-redux";

import getLayout from "../../../helpers/getLayout";
import AppText from "../../basic/AppText";
import AppView from "../../basic/AppView";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import appColor from "../../../commonTheme";
class NotificationBadge extends React.Component {
  render() {
    const {
      listSelectedProduct,
      color,
      listLikedProduct,
      favourite
    } = this.props;
    if (favourite) {
      return (
        <AppView
          style={{
            zIndex: 0,
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Ionicons name="ios-heart" size={25} color="#FFF" />
          {listLikedProduct.length > 0 ? (
            <AppView
              center
              style={{
                position: "absolute",
                width: 18,
                height: 18,
                left: 12,
                bottom: 8,
                borderRadius: 9,
                backgroundColor: "#EF3054",
                zIndex: 2
              }}
            >
              <AppText fullWhite>{listLikedProduct.length}</AppText>
            </AppView>
          ) : (
            undefined
          )}
        </AppView>
      );
    } else {
      return (
        <AppView
          style={{
            zIndex: 0,
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Ionicons name="ios-notifications" size={30} color={color} />
          {listSelectedProduct.length > 0 ? (
            <AppView
              center
              style={{
                position: "absolute",
                width: 18,
                height: 18,
                right: 20,
                top: 2,
                borderRadius: 9,
                backgroundColor: "#EF3054",
                zIndex: 2
              }}
            >
              <AppText fullWhite>{listSelectedProduct.length}</AppText>
            </AppView>
          ) : (
            undefined
          )}
        </AppView>
      );
    }
  }
}
mapStateToProps = state => {
  let { listSelectedProduct, listLikedProduct } = state.product;
  return {
    listSelectedProduct,
    listLikedProduct
  };
};

export default connect(
  mapStateToProps,
  {}
)(NotificationBadge);
