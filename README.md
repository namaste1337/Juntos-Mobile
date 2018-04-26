# Contents

 - About
 - Prerequisites
 - Getting Started
 - Development Builds

# About

The Juntos Platform was developed with React Native, Redux, NodeJS, MongoDB with the goal to help cash strapped non-profits by developing a framework to allow rapid development of a native application. To achieve this goal the project is primarily focused on developing features that are common across the non-profit industry, that allow user to congregate and collaborate.

Try the demo app! The Juntos Platform is live on both the iOS App store and Android Play Store, if you would like to try the features from the latest release: 

[`https://www.juntosplatform.org/#download`](https://www.juntosplatform.org/#download)

# Prerequisites

The prerequisite are a set of instructions that are required before being able to run the Juntos Platform on Mobile(iOS and Android). The instructions facilitate the development environment set up process, by providing detailed instructions for Mac.

The following outlines the prerequisites process:

 - Android 
	 - Command Line Tools
	-  Environment Variables for Mac
	-  Accept License Agreements
 - iOS 
	- Xcode
	- Developer Account Setup
	- iOS Simulator Configuration
 - Node.js
 - MongoDB
	 - Installing MongoDB
	 - Running MongoDB
		
**NOTE!!!!:** Currently, we only support development on Mac. We do have planned Windows support for the future, please check back for updates.
		
## Android

**Command Line Tools**

The Android Command Line tools are required by React Native as the build tool to generate a binary known as an APK(Similar to a .exe or .dmg), it also host a variety of tools that allow for the installing, debugging, and monitoring of your application.

1. To get started with the Android SDK you will need to download the command line tools from the Android Developer website, please use the following link:

> [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

2. Once you have downloaded the command line tools, create a folder named `android_sdk` in your home directory:

	`mkdir  android_sdk`
	
	 Please make note of the install directory since it will be used to setup the environment variables.
 
3. Extract the command line tools to the `android_sdk` folder from the step above.

**NOTE:** When visiting the Android Developer website, the link to download the command line tools is not evident. You must click the “Download Options” link, this will redirect you to the “Select a different platform” section of the page, if you continue to scroll downward you will come across the “Get just the command line tools” section. Here is where you select the the platform for which you wish to install the Command Line tools.

**Environment Variables**

The Android development environment requires a few additions to your .bash_profile. This will allow React Native and your command line direct access to many of the useful commands like; android, emulator, and adb which allow you to manage SDK packages, configure emulators, and the capability to build, install, and run APK packages.

1.  Locate the file .bash_profile(This file will be located in your home directory) and open it up with your favorite text editor. If the .bash_profile does not exist in your home directory you can create it with the following command:

	 `touch .bash_profile`
	 
2.  Once you have your .bash_profile open, please insert the following exports to the end of your file. Please be sure to replace the *directory* tag, with the path to your `android_sdk` folder:

>     export ANDROID_SDK_ROOT=<directory>/android_sdk
>     export ANDROID_HOME=$ANDROID_SDK_ROOT
>     export PATH=$ANDROID_SDK_ROOT:$PATH
>     export PATH=$ANDROID_SDK_ROOT/build-tools:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/tools/bin:$PATH

**Note:** The exports above include a few directories that do not exist. These directories will be automatically created when you run the initial build for Android.

3.  Once you have added the exports from above, save and and close your file.
4.  To complete the environment set up, the .bash_profile must be reset for the terminal to include the Android SDK commands. To do so, run the following terminal command in the directory of your .bash_profile: 

> source ~/.bash_profile  

**Accept License Agreements**

We need to accept the Android SDK license agreements, before we are allowed to build for Android. So lets go ahead and do that, by running the following command:

`yes | sudo sdkmanager --licenses`

    
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

 1. First we need to install brew

	 `
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
`

2. Next, run brew update

	`brew update`

3. Now we can install Node

    `brew install node`

To verify that node has been installed run node in the command line this will pull up the node.js command line interface and can be utilized as a JavaScript interpreter.

    node
Give it a try, type in `i=3` and then `console.log(i+3)`. You can also verify npm by running the command `npm`, this will display a list of available parameters and commands that can be used for node package management.

## MongoDB

MongoDB is a document-oriented database used as the primary storage for the Juntos Platform. MongoDB interacts with NodeJS and ExpressJS to save and retrieve data for the Mobile client. The following will guide you through the steps of installing MongoDB, running MongoDB, and importing test data.

**Installing MongoDB**

 1. To install MongoDB we run the following brew command

	 `brew install mongodb`

 2. Once MongoDB has finished installing you must  now create the /data/db directory. This is where the mongo data will live.

	`sudo mkdir /data` 
    `sudo mkdir /data/db`

 3. We must make sure that the directory has the right permissions. You want to grant it full read and write permissions.

    `sudo chmod 777 /data/db`

**Running MongoDB**

We can now run mongoDB via the command line, we also want to make sure that it runs as a background process.

    sudo mongod &
 The ampersand tells the system that we want MongoDB running as a background process, until we manually kill the process or the system is restarted.
 
# Getting Started

Now that you have your development environment setup, your ready to get the Juntos Platform up and running.

## Juntos Backend

**Cloning Juntos Backend**

To get the latest feature and updates for the Juntos Backend it is recommended that you clone from master with the following:

    git clone https://github.com/CheCm19/Juntos-Backend.git

**Installing Node Modules**

Once you have pulled the backend to your local directory you will have to install all the node module dependencies with the following:

    npm install



**Importing Test Data**

If you wish to use our test data, please follow along, the data provided is the same data that is found in the live demo application. But if you wish to create your own data via the Mobile client you may skip this step.

1. First you will need to download the test data from the following link:

> https://www.juntosplatform.org/juntos_test_data.zip

2. juntos_test_data.zip contains a single folder `juntos/` this is the folder that will be fed to mongorestore to populate mongo with the test data.

    mongorestore --db juntos juntos/

3. Next, you will need to download the image test assets, these are the images associated with the mongo test data from the above step. The image assets can be found at the following link:

    https://www.juntosplatform.org/juntos_test_images.zip

4. Now unzip the `juntos_test_images.zip` this will reveal a single folder `images/`.

5. Next, replace the existing images folder located in   `Juntos-Backend/public/images` with the images folder from the above step.

**Starting up Juntos backend**

To start the back-end run the following command:

    npm start
    

## Juntos Mobile

**Cloning  Juntos Mobile**

To get the latest feature and updates for Juntos Mobile it is recommended that you clone from master with the following:

    git clone https://github.com/CheCm19/Juntos-Mobile.git

**Installing Node Modules**

Once you have pulled the Mobile client to your local directory you will have to install all the node module dependencies with the following:

    npm install

# Development Builds

**iOS Development Builds**  

Execute the following command to build and install to the iOS simulator:

    react-native run-ios


**Android Development Builds**  

Execute the following command to build and install to an android device:

      react-native run-android
When you executing the initial build for Android, you may notice that it's taking longer than expected. That is because the initial build process must download the required Android SDK and dependencies.

**Note:** At the time of writing this document there are issues connecting to the system_image repositories which is required to setup the Android emulator. So for the moment we recommended that you use an Android device for testing development builds 


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2MjAxNzEzNDRdfQ==
-->