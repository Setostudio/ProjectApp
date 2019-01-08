import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { Item, Input } from "native-base";

import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppText from "../../components/basic/AppText";
import AppButton from "../../components/basic/AppButton";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";

import getLayout from "../../helpers/getLayout";

import ListProduct from "../../components/others/ListProduct";
import { connect } from "react-redux";
import appColor from "../../commonTheme";

import {
  filterItemAction,
  sortAlphabetAction,
  sortPriceAction,
  toggleCategoryAction,
  toggleSortAction
} from "../../actions";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      selected: "",
      isModalVisible: false,
      value: 2000
    };
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item }) => <ListProduct data={item} />;

  _renderEmpty = () => {
    if (this.props.filterList.length < 1) {
      return (
        <AppView
          style={{
            width: getLayout.width,
            height: (getLayout.height * 5) / 11
          }}
          center
        >
          <AppText style={{ color: appColor.analogousColor, fontSize: 18 }}>
            No search result match!
          </AppText>
        </AppView>
      );
    } else {
      return (
        <AppView>
          <FlatList
            data={this.props.filterList}
            extraData={this.props}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </AppView>
      );
    }
  };

  _renderModal = () => {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        onBackButtonPress={() => {
          this.setState({ isModalVisible: false });
        }}
        onBackdropPress={() => {
          this.setState({ isModalVisible: false });
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              width: (getLayout.width * 2) / 3,
              height: getLayout.height / 3,
              borderRadius: 20
            }}
          >
            <View>
              <View
                style={{
                  padding: 10,
                  width: (getLayout.width * 2) / 3,
                  height: getLayout.height / 9,
                  borderBottomWidth: 0.5
                }}
              >
                <AppText fontSize={16} style={{ color: appColor.primaryColor }}>
                  Search By Category:
                </AppText>
              </View>
              <View
                style={{
                  width: (getLayout.width * 2) / 3,
                  height: (getLayout.height * 2) / 9,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <AppText fontSize={16}>Search by Price:</AppText>

                <View style={{ marginTop: 20, flexDirection: "row" }}>
                  <AppView
                    style={{
                      padding: 10,
                      borderRadius: 5,
                      backgroundColor: appColor.primaryColor
                    }}
                    onPress={this._onFinishBooking}
                  >
                    <AppText isWhite>OKAY!</AppText>
                  </AppView>
                  <AppView
                    style={{
                      marginLeft: 15,
                      padding: 10,
                      borderRadius: 5,
                      backgroundColor: appColor.errorColor
                    }}
                    onPress={this._toogleModal}
                  >
                    <AppText isWhite>LATER</AppText>
                  </AppView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <AppView>
        <this._renderModal />
        <AppView>
          <AppView style={{ margin: 15 }}>
            <Item rounded>
              <Input
                placeholder="Search Product"
                onChangeText={e => {
                  this.setState({ searchInput: e });
                  if (this.state.searchInput != "") {
                    this.props._filterItemAction(e);
                  }
                }}
              />
              <AppView row>
                <Ionicons
                  name="ios-search"
                  size={30}
                  color={appColor.primaryColor}
                  style={{ marginRight: 10 }}
                />

                <AppView
                  onPress={() => {
                    this.setState({ isModalVisible: true });
                  }}
                >
                  <Ionicons
                    name="ios-options"
                    size={30}
                    color={appColor.primaryColor}
                    style={{ marginRight: 10 }}
                  />
                </AppView>
              </AppView>
            </Item>
          </AppView>

          <AppView style={{ width: getLayout.width, marginTop: 15 }} center>
            <FlatList
              horizontal={true}
              data={this.props.listSortSelection}
              extraData={this.props}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => {
                return (
                  <AppView
                    onPress={() => {
                      this.props._toggleSortAction(item._id);
                    }}
                    flexSize={1}
                    center
                    style={{
                      borderRadius: 10,
                      padding: 5,
                      marginLeft: 10,
                      backgroundColor: item.isSelected
                        ? appColor.primaryColor
                        : appColor.cardGrey
                    }}
                  >
                    <AppText>{item.name}</AppText>
                  </AppView>
                );
              }}
            />
          </AppView>

          <this._renderEmpty />
        </AppView>
      </AppView>
    );
  }
}
mapStateToProps = state => {
  let {
    listProduct,
    filterList,
    listCategory,
    listSortSelection
  } = state.product;
  return {
    listProduct,
    filterList,
    listCategory,
    listSortSelection
  };
};

mapDispatchToProps = dispatch => ({
  _filterItemAction: keyword => dispatch(filterItemAction(keyword)),
  _toggleCategoryAction: _id => dispatch(toggleCategoryAction(_id)),
  _sortAlphabetAction: method => dispatch(sortAlphabetAction(method)),
  _sortPriceAction: method => dispatch(sortPriceAction(method)),
  _toggleSortAction: _id => dispatch(toggleSortAction(_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
