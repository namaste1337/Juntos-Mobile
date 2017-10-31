import { StackNavigator, TabNavigator } from 'react-navigation'
import { Image } from 'react-native';
// Import Views
import LandingView    from '../screens/Landing';
import LoginView      from '../screens/LogIn';
import SignUpView     from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import Projects       from '../screens/Projects';
import Profile       from '../screens/Profile';

// Import header options
import HeaderOptions from '../config/header'

// Tab Navigator - After sign in or sign up
const signedIn = TabNavigator({
  Projects: { 
    screen: Projects,
    navigationOptions: ({navigation}) => ({
      title: "Projects",
    })
  },
  Profile: { 
    screen: Profile,
    navigationOptions: ({navigation}) => ({
      title: "Profile",
    }), 
  },
});


// Root Navigator
const rootRoutes = {
  Landing: { screen: LandingView },
  Login:  { 
    screen: LoginView,
    navigationOptions: ({navigation}) => ({
      title: "Log In",
    }), 
  },
  Signup:{
  	screen: SignUpView,
    navigationOptions: ({navigation}) => ({
      title: "Sign Up",
    }), 
  },
  ForgotPassword:{
    screen: ForgotPassword,
    navigationOptions: ({navigation}) => ({
      title: "Forgot Password",
    }), 
  },
  signedIn:{
    screen: signedIn, 
  }

}

export default StackNavigator(rootRoutes, HeaderOptions);
