# Contents

 - About
 - Prerequisites
 - Getting Started
 - Development Builds

# About

The Juntos Platform was developed with React Native, Redux, NodeJS, MongoDB with the goal to help cash strapped non-profits by developing a framework to allow rapid development of a native application. To achieve this goal the project is primarily focused on developing features that are common across the non-profit industry, that allow user to congregate and collaborate.

Try the demo app, the Juntos Platform is live on both the iOS App store and Android Play Store if you would like to try the features of the latest release: 

[`https://www.juntosplatform.org/#download`](https://www.juntosplatform.org/#download)

# Prerequisites

The prerequisite are a set of instructions that are required before being able to run the Juntos Platform on Mobile(iOS and Android). The instructions facilitate the development environment set up process, by providing detailed instructions for Mac.

The following outlines the prerequisites process:

 - Android 
	- Environment Variables for Mac
	- Download Android Platform-Tools v23.0.0 & Build Tools  v23.0.1
 - iOS 
	- Xcode
	- Developer Account Setup
	- iOS Simulator Configuration
 - Node.js
 - MongoDB
	 - Installing MongoDB
	 - Import Data
		
**NOTE!!!!:** Currently, we only support development on Mac. We do have planned Windows support for the future, please check back for updates.
		
## Android

**Command Line Tools**

The Android SDK is required by React Native as the build tool to generate a binary known as an APK(Similar to a .exe or .dmg), it also host a variety of tools that allow for the installing, debugging, and monitoring of your application.

To get started with Android SDK you will need to download the command line tools from the Android Developer website, please use the following link:

    

> [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

Once downloaded please extract to your preferred directory. Please make note of the install directory since it will be used to setup the environment variables.

**NOTE:** When visiting the Android Developer website, the link to download the command line tools is not evident. You must click the “Download Options” link, this will redirect you to the “Select a different platform” section of the page, if you continue to scroll downward you will come across the “Get just the command line tools” section. Here is where you select the the platform for which you wish to install the Command Line tools.

**Environment Variables**

The Android development environment requires a few additions to your .bash_profile. This will allow React Native and your command line direct access to many of the useful commands like; android, emulator, and adb which allow you to manage SDK packages, configure emulators, and the capability to build, install, and run APK packages.

1.  Locate the file .bash_profile(This file will be located in your home directory) and open it up with your favorite text editor. If the .bash_profile does not exist in your home directory you can create it with the following command:

	 `touch .bash_profile`
	 
2.  Once you have your .bash_profile open, please insert the following exports to the end of your file. Please be sure to replace the *directory* tag with the install path of your Android SDK command line tools:

>     export ANDROID_SDK_ROOT=/Users/cesarmiranda/Desktop/tools
>     export ANDROID_HOME=$ANDROID_SDK_ROOT
>     export PATH=$ANDROID_SDK_ROOT:$PATH
>     export PATH=$ANDROID_SDK_ROOT/build-tools:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/bin:$PATH

**Note:** The exports above include a few directories that do not exist. These directories will be created once you have finished the process detailed in the "Download Android Platform-Tools v23.0.0 & Build Tools  v23.0.1" section of the readme.

3.  Once you have added the exports from above, save and and close your file.
4.  To complete the environment set up, the .bash_profile must be reset for the terminal to include the Android SDK commands. To do so, run the following terminal command in the directory of your .bash_profile: 

> source ~/.bash_profile  

**Download Android Platform-Tools v23.0.0 & Build Tools  v23.0.1**

Now that you have have downloaded the Android SDK command line tools  and configured  your environment variables, we are ready to move on to installing the required platform-tools and build-tools. 

Here we will use the *sdkmanager* tool that was made available via enviroment variables. To install the platform-tools required by the Juntos project execute the following command:

    sdkmanager platform-tools 'platforms;android-23'

Next, install the build tools:
 
    sdkmanager 'build-tools;23.0.1'

**Note:**  *sdkmanager* defaults the download path to the Desktop. Move the packages to the command line tools directory since this will serve as your primary directory for all of your android related tools. The folders should reflect the environment variable exports from above.

Last, to insure that we have access to all the commands required to build and run Juntos. You will need to reset the .bash_profile once more:

    source ~/.bash_profile
    
## iOS

The following will cover the installation of Xcode, developer account setup and iOS simulator configuration.

**Note:** iOS requires a that you join the Apple Developer program to be enable you to sign and ship your applications. There is a an annual fee of $100 USD, if your not a member you can join via the link below: 
> https://developer.apple.com/programs/

**Xcode**

Juntos requires Xcode to build and install to iOS. Xcode can be downloaded via the Mac App Store, a quick search will turn up an icon similar to the image shown below. Once downloaded open Xcode via the Applications folder.

![enter image description here](https://i.imgur.com/ZxKoN02.png)

**Developer Account Setup**

Xcode requires that you have an Apple Developer account to sign and ship your apps for both development and production. The following steps outline adding an account to Xcode:

 1. Navigate to `Xcode->Preferences->Accounts`.
 2. Click the `+` in the bottom right hand corner of the Accounts window.
 3. Xcode will prompt for you Apple Developer Program credentials.
 4. Fill the fields with your credentials and click the `Sign In` button.

**iOS Simulator Configuration**

Xcode provides a number of Simulators from iOS 9 to the latest iOS 11. For Juntos we will setup the iOS 11 Simulator. In the future if you wish to install a different simulator these instructions can be applied to any of the versions.

 1. Navigate to `Xcode->Preferences->Components`
 2. Click the download arrow to to the left of the `iOS 11.0 Simulator` as shown in the image bellow. This will begin the download.
![enter image description here](https://i.imgur.com/0yjhqJc.png)
 3. Once simulator has finished downloading Xcode can be closed. 

We will revisit Xcode when it comes time to create a production build. Now that you have completed the Xcode configurations, React Native will handle the process of building, installing and launching your simulator for iOS development builds.

## Node.js

NodeJS is a Javascript runtime that has been built on top of Google's V8 Javascript engine. And is utilized in the Juntos-Backend with ExpressJS to develop Restful API's which handle the storage of user, and project data for the Juntos Platform. The latest version of Node.js now includes NPM a great tool for managing Node modules,  NPM will be used extensively in the "Getting Started" section to get both the Mobile and Backend up and running.

Here we will be using `brew` to get Node.js installed.

First we need to install brew
 ```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Next, run brew update

`brew update`

Now we can install Node

    brew install node

To verify that node has been installed run node in the command line this will pull up the node.js command line interface and can be utilized as a JavaScript interpreter.

    node
Give it a try, type in `i=3` and then `console.log(i+3)`. You can also verify npm by running the command `npm`, this will display a list of available parameters and commands that can be used for node package management.

## MONGODB
MongoDB is a document-oriented database used as the primary storage for the Juntos Platform. MongoDB interact with NodeJS and ExpressJS to save and retrieve data and at the Mobile clients request. The following will guide you through the steps of installing MongoDB, running MongoDB, and importing the test data.



# Getting Started

Now that you have your development environment setup, your ready to get the Juntos Platform up and running.


**Linking Native Libraries**

The following modules require some massaging to properly function with the mobile client. Some of the work can be handled by `react-native link` but others may require some manual configuration.  Below you will find links for each of the modules leading to the instructions written by there authors, to facilitate completing this step.

 - [react-native-app-settings](https://www.npmjs.com/package/react-native-app-settings)
 - [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)
 - [react-native-dialogs](https://www.npmjs.com/package/react-native-dialogs)
 - [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
 - [react-native-maps](https://github.com/react-community/react-native-maps)
 - [react-native-permissions](https://github.com/yonahforst/react-native-permissions)
 - [react-native-picker](https://github.com/beefe/react-native-picker)

# Development Builds

**Android Development Builds**  

At the time of writing this document there are issues connecting to the system_image repositories which is required to setup the Android emulator. So for the moment we recommended that you use an Android device for testing development builds 

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyMTc3OTU2MzVdfQ==
-->