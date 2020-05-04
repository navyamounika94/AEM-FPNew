import React, { Component } from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';

const ConfigEditConfig = {
  emptyLabel: 'Config',

  isEmpty: function (props) {

    return true;

  }
};
export default class Config extends Component {

  render() {

    if (this.props != null) {
      window.endPointsConfig = {};
      window.endPointsConfig.eosModelYearEndpoint = this.props.eospublic;
      window.endPointsConfig.dcs3Endpoint = this.props.dcs3;
      window.endPointsConfig.dcsApiKey = this.props.dcsApiKey;
      window.endPointsConfig.eosApiKey = this.props.eosApiKey;
    }
    console.log(window.endPointsConfig);
    return false;
  }
}
MapTo('lexusdrivers/components/content/config')(Config, ConfigEditConfig);