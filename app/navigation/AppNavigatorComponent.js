import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './AppNavigator';
import React from 'react';


class AppNavigatorComponent extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );s
  }
}

export default AppNavigatorComponent
