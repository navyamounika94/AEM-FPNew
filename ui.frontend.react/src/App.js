import { Page, withModel } from '@adobe/cq-react-editable-components';
import React from 'react';

// This component is the application entry point
class App extends Page {
  render() {
    return (
      <div className="container-fluid">
        {this.childComponents}
        {this.childPages}
      </div>
    );
  }
}

export default withModel(App);
