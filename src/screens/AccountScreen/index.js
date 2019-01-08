import React, { Component } from "react";
import { Image } from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon
} from "native-base";

import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppText from "../../components/basic/AppText";
import AppButton from "../../components/basic/AppButton";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";
import screenNames from "../screenNames";

import { connect } from "react-redux";
import appColor from "../../commonTheme";

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AppView>
        <AppHeader title="Your Account" />

        <AppView style={{ justifyContent: "flex-end" }}>
          <List>
            <ListItem>
              <AppView
                row
                onPress={() => {
                  this.props.navigation.navigate(screenNames.Liked);
                }}
              >
                <Left>
                  <AppText>
                    WishList : ({this.props.listLikedProduct.length})
                  </AppText>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </AppView>
            </ListItem>
            <ListItem>
              <Left>
                <AppText>Currency</AppText>
              </Left>
              <Right>
                <AppText>USD</AppText>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <AppText>History Purchase</AppText>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <AppText>Term & Condition</AppText>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <AppText>About Us</AppText>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </AppView>
      </AppView>
    );
  }
}

mapStateToProps = state => {
  let { listLikedProduct } = state.product;
  return { listLikedProduct };
};

export default connect(mapStateToProps)(AccountScreen);
