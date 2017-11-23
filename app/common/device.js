// This file will host constants and functions
// related to device properties ex. device types,
// device width and height.

////////////////////////
// Import Modules
////////////////////////
import{
	Dimensions
} from "react-native";

////////////////////////
// Constants
////////////////////////

////////////////////////
// Helper Functions
////////////////////////

////////////////////////
// Functions
///////////////////////

// The following constant define the device strings
// that may be shared through out the app to check
// the users device type ex. Platform.OS == deviceTypes.ios
export const deviceTypes = {
	ios: "ios",
	android: "android"
}

export const deviceProperties = {
	width: Dimensions.get("window").width,
	height: Dimensions.get("window").height,
}