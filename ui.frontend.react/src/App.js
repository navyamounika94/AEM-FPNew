import { Page, withModel } from '@adobe/cq-react-editable-components';
import React from 'react';
import SiteLoader from '../src/components/siteLoader'

// This component is the application entry point
class App extends Page {
  render() {
    return (
      <div className="container-fluid">
        {this.childComponents}
        {this.childPages}
        <SiteLoader />
      </div>
    );
  }
}

export default withModel(App);
