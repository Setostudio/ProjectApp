import axios from "axios";
import { CATEGORIES_API, PRODUCT_API } from "./apiConfig";

import React, { Component } from "react";
import { View, Text } from "react-native";

class ApiService extends Component {
  _fetchAllProduct = () => {
    return axios
      .get(PRODUCT_API)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err;
      });
  };

  _fetchAllCategory = () => {
    return axios
      .get(CATEGORIES_API)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err;
      });
  };

  _fetchAllProductCategory = categoryId => {
    return axios
      .get(`${PRODUCT_API}/byCategory/${categoryId}`)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err;
      });
  };
}

export default new ApiService();
