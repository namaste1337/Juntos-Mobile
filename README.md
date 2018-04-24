# Contents

 - About
 - Prerequisites
 - Getting Started
 - Simulator Builds

# About

The Juntos Platform was developed with React Native, Redux, NodeJS, MongoDB with the goal to help cash strapped non-profits by developing a framework to allow rapid development of a native application. To achieve this goal the project is primarily focused on developing features that are common across the non-profit industry, that allow user to congregate and collaborate.

# Prerequisites

The prerequisite are a set of instructions that are required before being able to run the Juntos Platform on Mobile(iOS and Android). The instructions facilitate the development environment set up process, by providing detailed instructions for Mac.

The following outlines the prerequisites process:

- Android SDK 
	- Environment Variables for Mac
	- Download Android Platform-Tools v23.0.0 & Build Tools  v23.0.1
	- Emulator Configuration
- MacOS (Required to create builds for iOS
	- Xcode
- Yarn
- NodeJS
- MongoDB
	- Import Data
		
**NOTE!!!!:** Currently, we only support development on Mac. We do have planned Windows support for the future, please check back for updates.
		
## Android SDK

**Command Line Tools**

The Android SDK is required by React Native as the build tool to generate a binary known as an APK(Similar to a .exe or .dmg), it also host a variety of tools that allow for the installing, debugging, and monitoring of your application.

To get started with Android SDK you will need to download the command line tools from the Android Developer website, please use the following link:

    

> [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

Once downloaded please extract to your preferred directory. Please make note of the install directory since it will be used to setup the environment variables.

**NOTE:** When visiting the Android Developer website, the link to download the command line tools is not evident. You must click the “Download Options” link, this will redirect you to the “Select a different platform” section of the page, if you continue to scroll downward you will come across the “Get just the command line tools” section. Here is where you select the the platform for which you wish to install the Command Line tools.

**Environment Variables**

The Android development environment requires a few additions to your .bash_profile. This will allow React Native and your terminal direct access to many of the useful commands like; android, emulator, and adb which allow you to manage SDK packages, configure emulators, and the capability to build, install, and run APK packages.

1.  Locate the file .bash_profile(This file will be located in your home directory) and open it up with your favorite text editor. If the .bash_profile does not exist in your home directory you can create it with the following command:

	 `touch .bash_profile`
	 
2.  Once you have your .bash_profile open, please insert the following exports to the end of your file. Please be sure to replace the *directory* tag with the install path of your Android SDK command line tools:

>     export ANDROID_SDK_ROOT=<directory>/tools  
>     export ANDROID_HOME=$ANDROID_SDK_ROOT  
>     export PATH=$ANDROID_SDK_ROOT:$PATH
>     export PATH=$ANDROID_SDK_ROOT/buid-tools:$ANDROID_SDK_ROOT/platform-tools:$PATH

**Note:** The exports above include a few directories that do not exist. These directories will be created once you have finished the process detailed in the "Download Android Platform-Tools v23.0.0 & Build Tools  v23.0.1" section of the readme.

3.  Once you have added the exports from above, save and and close your file.
4.  To complete the environment set up, the .bash_profile must be reset for the terminal to include the Android SDK commands. To do so, run the following terminal command in the directory of your .bash_profile: 

> source ~/.bash_profile  

**Download Android Platform-Tools v23.0.0 & Build Tools  v23.0.1**

Now that you have have downloaded the Android SDK command line tools  and configured  your environment variables, we are ready to move on to installing the required platform-tools and build-tools. 

Here we will use the *sdkmanager* tool that was made available via command line tools download. To install the platform-tools required by the Juntos project, navigate to the command line tools directory and access the bin folder(Default path: tools/bin) from your terminal and execute the following command:

    sdkmanager platform-tools 'platforms;android-23'

Next, install the build tools with the following command, again within your android  Android Command Line Tools directory:
 
    sdkmanager 'build-tools;23.0.1'

**Note:**  *sdkmanager* defaults the download path to the Desktop. Move the packages to the command line tools directory since this will serve as your primary directory for all of your android related tools. The folders should reflect the environment variable exports from above.

Last, to insure that we have access to all the commands required to build and run Juntos. You will need to reset the .bash_profile once more:

    source ~/.bash_profile

**Emulator Configuration**




# Getting Started

Now that you have your development environment setup, your ready to get the Juntos Platform up and running.



  



<!--stackedit_data:
eyJoaXN0b3J5IjpbMTkyNzc1MzEyNl19
-->