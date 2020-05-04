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
      window.endPointsConfig.dcsApiKey = "kkveIpcTwE57HNHQl4oiBX2UcI7smBM7lQm1YtZd";
      window.endPointsConfig.eosApiKey = "CIzm7ytLco5j7FINAtTGm1xAqDODwrVd8zHhtXZ1";
    }
    console.log(window.endPointsConfig);
    return false;
  }
}
MapTo('lexusdrivers/components/content/config')(Config, ConfigEditConfig);