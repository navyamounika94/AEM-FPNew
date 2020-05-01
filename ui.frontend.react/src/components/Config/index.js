import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';

const ConfigEditConfig = {
    emptyLabel: 'Config',

    isEmpty: function (props) {
        return true;
		
		console.log('propss');
		console.log(props);
    }
};
export default class Config extends Component {
    render() {
     
      return false;
    }
}
MapTo('lexusdrivers/components/content/config')(Config, ConfigEditConfig);