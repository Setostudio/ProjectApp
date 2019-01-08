import React, { Component } from "react";
import { View, Text } from "react-native";

import getLayout from "../../../helpers/getLayout";
import AppText from "../../basic/AppText";
import AppView from "../../basic/AppView";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import appColor from "../../../commonTheme";

import Modal from "react-native-modal";
class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackButtonPress={this.props.onBackButtonPress}
        onBackdropPress={this.props.onBackdropPress}
      >
        <AppView center flexSize={1}>
          <AppView
            center
            style={{
              backgroundColor: "#FFF",
              width: (getLayout.width * 2) / 3,
              height: getLayout.height / 4,
              borderRadius: 20
            }}
          >
            <AppView
              style={{
                flex: 1,
                padding: 10,
                justifyContent: "flex-end"
              }}
            >
              <AppText fontSize={16}>Are you sure you want to delete?</AppText>
            </AppView>
            <AppView
              center
              style={{
                padding: 10,
                flex: 2
              }}
            >
              <AppView row>
                <AppView
                  style={{
                    padding: 17,
                    borderRadius: 5,
                    backgroundColor: appColor.primaryColor
                  }}
                  onPress={this.props.onConfirm}
                >
                  <AppText isWhite>YES!</AppText>
                </AppView>
                <AppView
                  style={{
                    marginLeft: 15,
                    padding: 17,
                    borderRadius: 5,
                    backgroundColor: appColor.errorColor
                  }}
                  onPress={this.props.onExit}
                >
                  <AppText isWhite>NO!</AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </Modal>
    );
  }
}

export default ModalConfirm;
