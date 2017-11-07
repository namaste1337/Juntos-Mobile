// This file will host the routes for requires
// by react-navigation

//////////////////////////////
// Imports
///////////////////////////////

import { StackNavigator, TabNavigator } from 'react-navigation'
import { Image } from 'react-native';

//////////////////////////////
// Imports Screen
///////////////////////////////

// Import Screens
import LandingView    from '../screens/Landing';
import LoginView      from '../screens/LogIn';
import SignUpView     from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import Projects       from '../screens/Projects';
import Profile       from '../screens/Profile';

//////////////////////////////
// Imports Options
///////////////////////////////

// Import header options
import HeaderOptions from '../config/header'

//////////////////////////////
// Constants
///////////////////////////////


// Tab Navigator - After sign in or sign up
const SignedIn = TabNavigator({
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
}, HeaderOptions);

// Stack Navigator - Before Sign in or sign up
const SignedOut = StackNavigator({ 
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
  SignedIn:{
    screen: SignedIn, 
  }
}, HeaderOptions);

// Root Navigator
const rootRoutes = StackNavigator({
  Landing: { 
    screen: LandingView 
  },
  SignedIn: {
    screen: SignedIn,
  },
  SignedOut: {
    screen: SignedOut
  }
},{
    headerMode: "none" 
});

export default rootRoutes;
