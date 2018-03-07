// This file will host the routes for required
// by react-navigation

////////////////////////
// Import Modules
////////////////////////

import { 
  StackNavigator, 
  TabNavigator,
} from "react-navigation"

////////////////////////
// Imports Screen
////////////////////////

// Import Screens
import LandingView              from "../screens/Landing";
import LoginView                from "../screens/LogIn";
import SignUpView               from "../screens/Signup";
import ForgotPassword           from "../screens/ForgotPassword";
import Projects                 from "../screens/Projects";
import Profile                  from "../screens/Profile";
import Messages                 from "../screens/Messages";
import Settings                 from "../screens/Settings";
import CreateProjectDescription from "../screens/createProject/CreateProjectDescription";
import CreateProjectDetails     from "../screens/createProject/CreateProjectDetails";
import CreateProjectImages      from "../screens/createProject/CreateProjectImages";
import CreateProjectPreview     from "../screens/createProject/CreateProjectPreview";


////////////////////////
// Imports Options
////////////////////////

// Import header options
import StackNavigationOptions from "../config/stackNavigation";
import TabbarNavigationOptions from "../config/tabBarNavigation";

////////////////////////
// Constants
////////////////////////

// Strings
const PROJECT_SCREEN_TITLE_STRING               = "Projects";
const PROFILE_SCREEN_TITLE_STRING               = "Profile";
const LOGIN_SCREEN_TITLE_STRING                 = "Log In";
const SIGN_UP_SCREEN_TITLE_STRING               = "Sign Up";
const FORGOT_PASSWORD_SCREEN_TITLE_STRING       = "Forgot Password";
const MESSAGES_SCREEN_TITLE_STRING              = "Messages";
const SETTING_SCREEN_TITLE_STRING               = "Settings";
const CREATE_PROJECT_DESCRIPTION_TITLE_STRING   = "Project Description"
const CREATE_PROJECT_DETAILS_TITLE_STRING       = "Project Details"
const CREATE_PROJECT_IMAGES_TITLE_STRING        = "Project Images"
const CREATE_PROJECT_PREVIEW_TITLE_STRING       = "Project Preview"
// Configs
const ROUTE_ROUTE_HEADER_MODE                   = "none";

////////////////////////
// Routes
////////////////////////

// Tab Navigator - After sign in or sign up
const Tabs = TabNavigator({
  Projects: { 
    screen: Projects,
    navigationOptions: ({navigation}) => ({
      title: PROJECT_SCREEN_TITLE_STRING,
    })
  },
  // The following tab will be commented out for 
  // now. The code will be left in place, since
  // a messaging feature is planned for a future
  // release.
  // Messages: {
  //   screen: Messages,
  //   navigationOptions: ({navigation}) => ({
  //     title: MESSAGES_SCREEN_TITLE_STRING,
  //   }), 
  // },
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => ({
      title: SETTING_SCREEN_TITLE_STRING,
    }), 
  }
}, TabbarNavigationOptions);


// Root Navigator
const RootRoutes = StackNavigator({
  Root: {
    screen: Tabs
  },
  CreateProjectDescription: { 
    screen: CreateProjectDescription,
    navigationOptions: ({navigation}) => ({
      title: CREATE_PROJECT_DESCRIPTION_TITLE_STRING,
    })
  },
  CreateProjectDetails: { 
    screen: CreateProjectDetails,
    navigationOptions: ({navigation}) => ({
      title: CREATE_PROJECT_DETAILS_TITLE_STRING,
    })
  },
  CreateProjectImages: { 
    screen: CreateProjectImages,
    navigationOptions: ({navigation}) => ({
      title: CREATE_PROJECT_IMAGES_TITLE_STRING,
    })
  },
  CreateProjectPreview: { 
    screen: CreateProjectPreview,
    navigationOptions: ({navigation}) => ({
      title: CREATE_PROJECT_PREVIEW_TITLE_STRING,
    })
  },
  Landing: { 
    screen: LandingView,
    navigationOptions: ({navigation}) => ({
      header: null // hide header only for the landing view
    }),  
  },
  Login:  { 
    screen: LoginView,
    navigationOptions: ({navigation}) => ({
      title: LOGIN_SCREEN_TITLE_STRING,
    }), 
  },
  Signup:{
    screen: SignUpView,
    navigationOptions: ({navigation}) => ({
      title: SIGN_UP_SCREEN_TITLE_STRING,
    }), 
  },
  ForgotPassword:{
    screen: ForgotPassword,
    navigationOptions: ({navigation}) => ({
      title: FORGOT_PASSWORD_SCREEN_TITLE_STRING,
    }), 
  },
}, StackNavigationOptions);

export default RootRoutes;
