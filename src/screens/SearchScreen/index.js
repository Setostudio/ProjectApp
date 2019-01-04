import React, { Component } from "react";
import { View, FlatList } from "react-native";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Picker,
  Form
} from "native-base";
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
  sortPriceAction
} from "../../actions";
class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      selected: ""
    };
  }

  _keyExtractor = (item, index) => item.productId;

  _renderItem = ({ item }) => <ListProduct data={item} />;

  _renderEmpty = () => {
    if (this.props.filterList.length < 1) {
      return (
        <AppView
          style={{
            width: getLayout.width,
            height: (getLayout.height * 8) / 11
          }}
          center
        >
          <AppText style={{ color: appColor.analogousColor, fontSize: 18 }}>
            No search result match
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
  render() {
    return (
      <AppView>
        <AppView>
          <Item rounded>
            <Input
              placeholder="Search Product"
              onChangeText={e => {
                this.setState({ searchInput: e });
              }}
            />
            <AppView
              onPress={() => {
                if (this.state.searchInput != "") {
                  this.props._filterItemAction(this.state.searchInput);
                  switch (this.state.selected) {
                    case "lh":
                      this.props._sortPriceAction(false);
                    case "hl":
                      this.props._sortPriceAction(true);
                    case "az":
                      this.props._sortAlphabetAction(true);
                    case "za":
                      this.props._sortAlphabetAction(false);
                  }
                }
              }}
            >
              <Ionicons
                name="ios-search"
                size={30}
                color={appColor.primaryColor}
                style={{ marginRight: 10 }}
              />
            </AppView>
          </Item>
          <AppView
            row
            style={{
              marginTop: 5,
              width: getLayout.width,
              height: getLayout.height / 11
            }}
          >
            <AppView flexSize={1} center>
              <AppText>Filter By:</AppText>
            </AppView>
            <AppView flexSize={1} center>
              <Form>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}
                  selectedValue={this.state.selected}
                  onValueChange={e => {
                    this.setState({ selected: e });
                  }}
                >
                  <Picker.Item label="No Filter" value="no" />
                  <Picker.Item label="A-Z" value="az" />
                  <Picker.Item label="Z-A" value="za" />
                  <Picker.Item label="Low to high" value="lh" />
                  <Picker.Item label="High to low" value="hl" />
                </Picker>
              </Form>
            </AppView>
          </AppView>
          <this._renderEmpty />
        </AppView>
      </AppView>
    );
  }
}
mapStateToProps = state => {
  return {
    listProduct: state.listProduct,
    filterList: state.filterList
  };
};

mapDispatchToProps = dispatch => ({
  _filterItemAction: keyword => dispatch(filterItemAction(keyword)),
  _sortAlphabetAction: method => dispatch(sortAlphabetAction(method)),
  _sortPriceAction: method => dispatch(sortPriceAction(method))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
