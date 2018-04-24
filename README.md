
<?xml version="1.0" encoding="UTF-8"?>


# Contents

 - About
 - Prerequisites
 - Getting Start
 - Builds

# About

The Juntos Platform was developed with React Native, Redux, NodeJS, MongoDB. The goal is to help cash strapped non-profits by developing a framework to allow the development of a native application on a shoe string budget. To achieve this goal the project is primarly focused on developing features that are common across the non-profit industry, that allow user to congregate and collaborate.

  

# Prerequisites

  

The prerequisite are a set of instructions that are required before being able to run the Juntos Platform on Mobile(iOS and Android). The instructions facilitate the development environment set up process, by providing detailed instructions for both Mac and Windows.

  

**Contents**

-Client Side

-Android SDK Command Line Tools

-Download and Install Android SDK 23.0.1

-Environment Variables for Mac and Window 10

-MacOS (Required to create builds for iOS)

-Xcode

-Yarn

  

-Server Side

-NodeJS

-MongoDB

-Import data

  

**Warning:** To run the Juntos Platform on an iOS device you must have access to a MacOS device as required by Apple.

  

Android SDK Command Line Tools (Client Side)

  

The Android SDK is required by React Native as the build tools to generate a binary known as an APK(Similar to a .exe or .dmg), it also host a variety of tools that allow for the installing, debugging, and monitoring of your application.

  

To get started with Android SDK you will need to download the command line tools from the Android Developer website, please use the following link:

  

[https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

  

Once downloaded please install to your preferred directory.

  

**Warning:** When visiting the Android Developer website, the link to download the command line tools is not evident. You must click the “Download Options” link, this will redirect you to the “Select a different platform” section of the page, if you continue to scroll downward you will come across the “Get just the command line tools” section. Here is where you select the the platform for which you wish to install the Command Line tools.

  

**Warning:** When installing the Android SDK command line tools please make note of the directory to which the tools are installed. The directory will be required to setup the environment variables in the Environment Variables section of this read me.

  

**Environment Variables for Mac & Windows 10 (Client Side)**

**​**Android SDK requires a few modifications to your .bash_profile to setup up the development environment. This will allow React Native and your terminal direct access to many of the useful commands like; android, emulator, and adb which allow you to manage SDK packages, configure emulators, and the capability to build, install, and run APK packages.

  

**MacOS**  

1.  Locate the file .bash_profile(This file will be located in your home directory) and open it up with your favorite text editor. If the .bash_profile does not exist in your home directory you can create it with the following command: touch .bash_profile
2.  Once you have your .bash_profile open, please insert the following exports to the end of your file. Please make sure to replace the <directory> tag with the install path of your Android SDK command line tools:

  

export ANDROID_SDK_ROOT=<directory>/Android/sdk  

export ANDROID_HOME=$ANDROID_SDK_ROOT  

export PATH=$ANDROID_SDK_ROOT:$PATH

export PATH=$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools:$PATH:$ANDROID_SDK_ROOT/build-tools/23.0.3:$PATH

  

3.  Once you have added the exports from above, save and and close your file.
4.  To complete the environment set up, the .bash_profile must be reset for the terminal to include the Android SDK commands. To do so run the following terminal command in the directory of your .bash_profile: source ~/.bash_profile

  

**Windows 10**  

  

1.  In Search, search for and then select: System (Control Panel)
2.  Click the Advanced system settings link.
3.  Click Environment Variables. In the section System Variables, find the PATH environment variable and select it. Click Edit. If the PATH environment variable does not exist, click NEW.
4.  In the Edit System Variable (or New System Variable) window, specify the value of the PATHenvironment variable. Click OK. Close all remaining windows by clicking OK.

  

Getting Started

​  

Now that you have your development environment setup, your ready to get the Juntos Platform up and running.

  

[https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

  

[https://yarnpkg.com/lang/en/docs/install/](https://yarnpkg.com/lang/en/docs/install/)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExNjUwNDI1MzYsMTc3MzQ1MzQ2MV19
-->