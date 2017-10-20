import AppNavigatorComponent from './AppNavigatorComponent'
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppNavigatorComponent);