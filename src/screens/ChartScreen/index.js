import React, { Component } from "react";
import { View, Text } from "react-native";

import LineChart from "react-native-responsive-linechart";

import { connect } from "react-redux";
import getLayout from "../../helpers/getLayout";

import AppText from "../../components/basic/AppText";
import AppButton from "../../components/basic/AppButton";
import AppHeader from "../../components/basic/AppHeader";
import AppView from "../../components/basic/AppView";
import data from "../../data";
import appColor from "../../commonTheme";

const dataArray = [1000, 1500];
const labels = ["04/01", "05/01"];
const config = {
  line: {
    visible: true,
    strokeWidth: 2,
    strokeColor: "#341f97"
  },
  area: {
    visible: false
  },
  yAxis: {
    visible: true,
    labelFormatter: v => String(v) + "$"
  },
  xAxis: {
    visible: true
  },
  grid: {
    stepSize: 400
  },
  insetY: 10,
  insetX: 10
};
class ChartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LineChart
        style={{ flex: 1 }}
        config={config}
        data={dataArray}
        xLabels={labels}
      />
    );
  }
}

export default ChartScreen;
