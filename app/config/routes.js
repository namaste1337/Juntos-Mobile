// Import Views
import LandingView    from '../screens/Landing';
import LoginView      from '../screens/LogIn';
import SignUpView     from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import MainView       from '../screens/Main';




const routes = {
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
  Main: { screen: MainView },
}

export default routes
